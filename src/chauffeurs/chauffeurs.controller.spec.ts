import { Test, TestingModule } from '@nestjs/testing';
import { ChauffeursController } from './chauffeurs.controller';

describe('ChauffeursController', () => {
  let controller: ChauffeursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChauffeursController],
    }).compile();

    controller = module.get<ChauffeursController>(ChauffeursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
