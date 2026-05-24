import { Test, TestingModule } from '@nestjs/testing';
import { UsersNotificationPreferencesResolver } from './users-notification-preferences.resolver';
import { UsersNotificationPreferencesService } from '../../application/users-notification-preferences.service';

describe('UsersNotificationPreferencesResolver', () => {
  let resolver: UsersNotificationPreferencesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersNotificationPreferencesResolver,
        {
          provide: UsersNotificationPreferencesService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<UsersNotificationPreferencesResolver>(
      UsersNotificationPreferencesResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
