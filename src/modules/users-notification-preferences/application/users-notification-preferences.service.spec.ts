import { Test, TestingModule } from '@nestjs/testing';
import { UsersNotificationPreference } from '../domain/entities/users-notification-preference.entity';
import { UsersNotificationPreferencesRepository } from '../domain/repository/users-notification-preferences-repository';
import {
  CreateUsersNotificationPreference,
  PreferenceIdentity,
  UpdateUsersNotificationPreference,
  UpsertUsersNotificationPreference,
} from '../domain/repository/types';
import { usersNotificationPreferencesRepositoryToken } from '../domain/repository/users-notification-preferences-repository-token';
import { EvaluationDecision } from '../domain/types/evaluation-decision';
import { NotificationChannel } from '../domain/types/notification-channel';
import { NotificationType } from '../domain/types/notification-type';
import { UsersNotificationPreferencesService } from './users-notification-preferences.service';

class InMemoryUsersNotificationPreferencesRepository
  implements UsersNotificationPreferencesRepository
{
  private readonly items: UsersNotificationPreference[] = [];

  createEntity(
    createUsersNotificationPreference: CreateUsersNotificationPreference,
  ): UsersNotificationPreference {
    return {
      id: createUsersNotificationPreference.id ?? 'default',
      userId: createUsersNotificationPreference.userId,
      notificationType: createUsersNotificationPreference.notificationType,
      channel: createUsersNotificationPreference.channel,
      enabled: createUsersNotificationPreference.enabled,
      quietHoursStart:
        createUsersNotificationPreference.quietHoursStart ?? null,
      quietHoursEnd: createUsersNotificationPreference.quietHoursEnd ?? null,
      timezone: createUsersNotificationPreference.timezone ?? null,
      createdAt: createUsersNotificationPreference.createdAt ?? new Date(0),
      updatedAt: createUsersNotificationPreference.updatedAt ?? new Date(0),
    } as UsersNotificationPreference;
  }

  async create(
    createUsersNotificationPreference: CreateUsersNotificationPreference,
  ): Promise<UsersNotificationPreference> {
    const item = this.createEntity({
      ...createUsersNotificationPreference,
      id: createUsersNotificationPreference.id ?? `${this.items.length + 1}`,
    });

    this.items.push(item);

    return item;
  }

  async update(
    updateUsersNotificationPreference: UpdateUsersNotificationPreference,
  ): Promise<UsersNotificationPreference> {
    const item = await this.findOne(updateUsersNotificationPreference.id);
    Object.assign(item, updateUsersNotificationPreference);

    return item;
  }

  async findAndCount(): Promise<[UsersNotificationPreference[], number]> {
    return [this.items, this.items.length];
  }

  async findOne(id: string): Promise<UsersNotificationPreference> {
    const item = this.items.find((preference) => preference.id === id);

    if (!item) {
      throw new Error('not found');
    }

    return item;
  }

  async findByUserId(userId: string): Promise<UsersNotificationPreference[]> {
    return this.items.filter((preference) => preference.userId === userId);
  }

  async findByIdentity(
    identity: PreferenceIdentity,
  ): Promise<UsersNotificationPreference | null> {
    return (
      this.items.find(
        (preference) =>
          preference.userId === identity.userId &&
          preference.notificationType === identity.notificationType &&
          preference.channel === identity.channel,
      ) ?? null
    );
  }

  async upsertPreference(
    upsertUsersNotificationPreference: UpsertUsersNotificationPreference,
  ): Promise<UsersNotificationPreference> {
    const existing = await this.findByIdentity(
      upsertUsersNotificationPreference,
    );

    if (existing) {
      Object.assign(existing, upsertUsersNotificationPreference);

      return existing;
    }

    return this.create(upsertUsersNotificationPreference);
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((preference) => preference.id === id);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }
}

describe('UsersNotificationPreferencesService', () => {
  let service: UsersNotificationPreferencesService;
  let repository: InMemoryUsersNotificationPreferencesRepository;

  beforeEach(async () => {
    repository = new InMemoryUsersNotificationPreferencesRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersNotificationPreferencesService,
        {
          provide: usersNotificationPreferencesRepositoryToken,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UsersNotificationPreferencesService>(
      UsersNotificationPreferencesService,
    );
  });

  it('returns default preferences for a new user', async () => {
    const result = await service.getUserPreferences('user-1');

    expect(result.preferences).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          notificationType: NotificationType.TRANSACTIONAL_EMAIL,
          channel: NotificationChannel.EMAIL,
          enabled: true,
        }),
        expect.objectContaining({
          notificationType: NotificationType.MARKETING_EMAIL,
          channel: NotificationChannel.EMAIL,
          enabled: false,
        }),
      ]),
    );
  });

  it('applies user preference changes idempotently', async () => {
    const input = {
      userId: 'user-1',
      notificationType: NotificationType.MARKETING_EMAIL,
      channel: NotificationChannel.EMAIL,
      enabled: false,
    };

    await service.setUserPreference(input);
    await service.setUserPreference(input);

    const [items, count] = await repository.findAndCount();

    expect(count).toBe(1);
    expect(items[0]).toEqual(expect.objectContaining(input));
  });

  it('denies notifications disabled by user preference', async () => {
    await service.setUserPreference({
      userId: 'user-1',
      notificationType: NotificationType.MARKETING_PUSH,
      channel: NotificationChannel.PUSH,
      enabled: false,
    });

    await expect(
      service.evaluate({
        userId: 'user-1',
        notificationType: NotificationType.MARKETING_PUSH,
        channel: NotificationChannel.PUSH,
        region: 'US',
        datetime: new Date('2026-05-21T12:00:00Z'),
      }),
    ).resolves.toEqual({
      decision: EvaluationDecision.DENY,
      reason: 'blocked_by_user_preference',
    });
  });

  it('denies non-transactional notifications during quiet hours', async () => {
    await service.setUserPreference({
      userId: 'user-1',
      notificationType: NotificationType.MARKETING_PUSH,
      channel: NotificationChannel.PUSH,
      enabled: true,
      quietHours: {
        start: '22:00',
        end: '08:00',
        timezone: 'UTC',
      },
    });

    await expect(
      service.evaluate({
        userId: 'user-1',
        notificationType: NotificationType.MARKETING_PUSH,
        channel: NotificationChannel.PUSH,
        region: 'US',
        datetime: new Date('2026-05-21T23:00:00Z'),
      }),
    ).resolves.toEqual({
      decision: EvaluationDecision.DENY,
      reason: 'blocked_by_quiet_hours',
    });
  });

  it('allows transactional notifications during quiet hours', async () => {
    await service.setUserPreference({
      userId: 'user-1',
      notificationType: NotificationType.TRANSACTIONAL_PUSH,
      channel: NotificationChannel.PUSH,
      enabled: true,
      quietHours: {
        start: '22:00',
        end: '08:00',
        timezone: 'UTC',
      },
    });

    await expect(
      service.evaluate({
        userId: 'user-1',
        notificationType: NotificationType.TRANSACTIONAL_PUSH,
        channel: NotificationChannel.PUSH,
        region: 'US',
        datetime: new Date('2026-05-21T23:00:00Z'),
      }),
    ).resolves.toEqual({
      decision: EvaluationDecision.ALLOW,
      reason: 'allowed',
    });
  });

  it('denies notifications blocked by global policy', async () => {
    await expect(
      service.evaluate({
        userId: 'user-1',
        notificationType: NotificationType.MARKETING_EMAIL,
        channel: NotificationChannel.EMAIL,
        region: 'EU',
        datetime: new Date('2026-05-21T21:30:00Z'),
      }),
    ).resolves.toEqual({
      decision: EvaluationDecision.DENY,
      reason: 'blocked_by_global_policy',
    });
  });
});
