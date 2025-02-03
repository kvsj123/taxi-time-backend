import { Test, TestingModule } from '@nestjs/testing';
import { ChauffeursService } from './chauffeurs.service';

describe('ChauffeursService', () => {
  let service: ChauffeursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChauffeursService],
    }).compile();

    service = module.get<ChauffeursService>(ChauffeursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
