import { Test, TestingModule } from '@nestjs/testing';
import { UsersNotificationPreferencesService } from '../../../users-notification-preferences/application/users-notification-preferences.service';
import { UsersService } from '../../application/users.service';
import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: UsersNotificationPreferencesService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
