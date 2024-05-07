import { Test, TestingModule } from '@nestjs/testing';
import { AsMailerService } from './as-mailer.service';

describe('AsMailerService', () => {
  let service: AsMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsMailerService],
    }).compile();

    service = module.get<AsMailerService>(AsMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
