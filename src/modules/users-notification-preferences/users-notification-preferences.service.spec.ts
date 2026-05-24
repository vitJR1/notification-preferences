import { Test, TestingModule } from '@nestjs/testing';
import { UsersNotificationPreferencesService } from './users-notification-preferences.service';

describe('UsersNotificationPreferencesService', () => {
  let service: UsersNotificationPreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersNotificationPreferencesService],
    }).compile();

    service = module.get<UsersNotificationPreferencesService>(UsersNotificationPreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
