import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users-notification-preferences')
export class UsersNotificationPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
