import { Test, TestingModule } from '@nestjs/testing';
import { UsersNotificationPreferencesService } from './users-notification-preferences.service';
import { usersNotificationPreferencesRepositoryToken } from '../domain/repository/users-notification-preferences-repository-token';

describe('UsersNotificationPreferencesService', () => {
  let service: UsersNotificationPreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersNotificationPreferencesService,
        {
          provide: usersNotificationPreferencesRepositoryToken,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersNotificationPreferencesService>(
      UsersNotificationPreferencesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
