import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ROLES } from '@/constants/enums/roles';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return all users if user is logged in', async () => {
    const user = { id: 1, roles: [ROLES.user] };
    // jest.spyOn(service, 'findAll').mockResolvedValue([user]);

    const request = { user };
    const result = await controller.findAll(request);

    expect(result).toEqual([user]);
  });

  it('should throw an error if user is not logged in', async ()=>{})
});
