import { Inject, Injectable, Logger } from '@nestjs/common';
import { DEFAULT_NOTIFICATION_PREFERENCES } from '../domain/default-preferences';
import { UsersNotificationPreference } from '../domain/entities/users-notification-preference.entity';
import { GLOBAL_NOTIFICATION_POLICIES } from '../domain/global-notification-policies';
import { usersNotificationPreferencesRepositoryToken } from '../domain/repository/users-notification-preferences-repository-token';
import { UsersNotificationPreferencesRepository } from '../domain/repository/users-notification-preferences-repository';
import { EvaluationDecision } from '../domain/types/evaluation-decision';
import { NotificationType } from '../domain/types/notification-type';
import { CreateUsersNotificationPreferenceInput } from '../interface/graphql/dto/create-users-notification-preference.input';
import { EvaluateNotificationInput } from '../interface/graphql/dto/evaluate-notification.input';
import { SetUserNotificationPreferenceInput } from '../interface/graphql/dto/set-user-notification-preference.input';
import { UpdateUsersNotificationPreferenceInput } from '../interface/graphql/dto/update-users-notification-preference.input';

@Injectable()
export class UsersNotificationPreferencesService {
  private readonly logger = new Logger(
    UsersNotificationPreferencesService.name,
  );

  constructor(
    @Inject(usersNotificationPreferencesRepositoryToken)
    private readonly repo: UsersNotificationPreferencesRepository,
  ) {}

  create(
    createUsersNotificationPreferenceInput: CreateUsersNotificationPreferenceInput,
  ) {
    return this.setUserPreference(createUsersNotificationPreferenceInput);
  }

  async findAll() {
    const [items, count] = await this.repo.findAndCount();

    return {
      items,
      info: {
        count,
      },
    };
  }

  async getUserPreferences(userId: string) {
    const preferences = await this.getEffectivePreferences(userId);
    const quietHours = this.extractQuietHours(preferences);

    return {
      userId,
      preferences,
      quietHours,
    };
  }

  async setUserPreference(input: SetUserNotificationPreferenceInput) {
    const preference = await this.repo.upsertPreference({
      userId: input.userId,
      notificationType: input.notificationType,
      channel: input.channel,
      enabled: input.enabled,
      quietHoursStart: input.quietHours?.start,
      quietHoursEnd: input.quietHours?.end,
      timezone: input.quietHours?.timezone,
    });

    this.logger.log(
      `notification_preference_updated userId=${input.userId} notificationType=${input.notificationType} channel=${input.channel} enabled=${input.enabled}`,
    );

    return preference;
  }

  async evaluate(input: EvaluateNotificationInput) {
    const globalPolicy = GLOBAL_NOTIFICATION_POLICIES.find(
      (policy) =>
        policy.notificationType === input.notificationType &&
        policy.channel === input.channel &&
        policy.region.toUpperCase() === input.region.toUpperCase(),
    );

    if (globalPolicy) {
      return this.logDecision(
        input,
        EvaluationDecision.DENY,
        globalPolicy.reason,
      );
    }

    const preference = await this.getEffectivePreference(
      input.userId,
      input.notificationType,
      input.channel,
    );

    if (!preference.enabled) {
      return this.logDecision(
        input,
        EvaluationDecision.DENY,
        'blocked_by_user_preference',
      );
    }

    if (
      this.isQuietHoursApplicable(input.notificationType) &&
      this.isWithinQuietHours(preference, input.datetime)
    ) {
      return this.logDecision(
        input,
        EvaluationDecision.DENY,
        'blocked_by_quiet_hours',
      );
    }

    return this.logDecision(input, EvaluationDecision.ALLOW, 'allowed');
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  update(
    id: string,
    updateUsersNotificationPreferenceInput: UpdateUsersNotificationPreferenceInput,
  ) {
    return this.repo.update({ ...updateUsersNotificationPreferenceInput, id });
  }

  remove(id: string) {
    return this.repo.delete(id);
  }

  private async getEffectivePreferences(
    userId: string,
  ): Promise<UsersNotificationPreference[]> {
    const userPreferences = await this.repo.findByUserId(userId);

    return DEFAULT_NOTIFICATION_PREFERENCES.map((defaultPreference) => {
      const override = userPreferences.find(
        (preference) =>
          preference.notificationType === defaultPreference.notificationType &&
          preference.channel === defaultPreference.channel,
      );

      return (
        override ??
        this.repo.createEntity({
          userId,
          notificationType: defaultPreference.notificationType,
          channel: defaultPreference.channel,
          enabled: defaultPreference.enabled,
        })
      );
    });
  }

  private async getEffectivePreference(
    userId: string,
    notificationType: NotificationType,
    channel: SetUserNotificationPreferenceInput['channel'],
  ): Promise<UsersNotificationPreference> {
    const preference = await this.repo.findByIdentity({
      userId,
      notificationType,
      channel,
    });

    if (preference) {
      return preference;
    }

    const defaultPreference = DEFAULT_NOTIFICATION_PREFERENCES.find(
      (item) =>
        item.notificationType === notificationType && item.channel === channel,
    );

    return this.repo.createEntity({
      userId,
      notificationType,
      channel,
      enabled: defaultPreference?.enabled ?? true,
    });
  }

  private extractQuietHours(preferences: UsersNotificationPreference[]) {
    const preferenceWithQuietHours = preferences.find(
      (preference) =>
        preference.quietHoursStart &&
        preference.quietHoursEnd &&
        preference.timezone,
    );

    if (!preferenceWithQuietHours) {
      return null;
    }

    return {
      start: preferenceWithQuietHours.quietHoursStart,
      end: preferenceWithQuietHours.quietHoursEnd,
      timezone: preferenceWithQuietHours.timezone,
    };
  }

  private isQuietHoursApplicable(notificationType: NotificationType): boolean {
    return !notificationType.startsWith('transactional_');
  }

  private isWithinQuietHours(
    preference: UsersNotificationPreference,
    datetime: Date,
  ): boolean {
    if (
      !preference.quietHoursStart ||
      !preference.quietHoursEnd ||
      !preference.timezone
    ) {
      return false;
    }

    const currentMinutes = this.getTimezoneMinutes(
      datetime,
      preference.timezone,
    );
    const startMinutes = this.parseTimeToMinutes(preference.quietHoursStart);
    const endMinutes = this.parseTimeToMinutes(preference.quietHoursEnd);

    if (startMinutes === endMinutes) {
      return false;
    }

    if (startMinutes < endMinutes) {
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    }

    return currentMinutes >= startMinutes || currentMinutes < endMinutes;
  }

  private getTimezoneMinutes(datetime: Date, timezone: string): number {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(datetime);

    const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
    const minute = Number(
      parts.find((part) => part.type === 'minute')?.value ?? 0,
    );

    return hour * 60 + minute;
  }

  private parseTimeToMinutes(value: string): number {
    const [hours, minutes] = value.split(':').map(Number);

    return hours * 60 + minutes;
  }

  private logDecision(
    input: EvaluateNotificationInput,
    decision: EvaluationDecision,
    reason: string,
  ) {
    this.logger.log(
      `notification_evaluated userId=${input.userId} notificationType=${input.notificationType} channel=${input.channel} region=${input.region} decision=${decision} reason=${reason}`,
    );

    return {
      decision,
      reason,
    };
  }
}
