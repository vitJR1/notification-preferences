import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../users/domain/entities/user.entity';
import { NotificationChannel } from '../types/notification-channel';
import { NotificationType } from '../types/notification-type';

@Entity('users_notification_preferences')
@Index(['userId', 'notificationType', 'channel'], { unique: true })
export class UsersNotificationPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @ManyToOne(
    () => User,
    (user) => user.notificationPreferences,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'notification_type', type: 'varchar' })
  notificationType: NotificationType;

  @Column({ type: 'varchar' })
  channel: NotificationChannel;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @Column({ name: 'quiet_hours_start', type: 'varchar', nullable: true })
  quietHoursStart: string | null;

  @Column({ name: 'quiet_hours_end', type: 'varchar', nullable: true })
  quietHoursEnd: string | null;

  @Column({ type: 'varchar', nullable: true })
  timezone: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
