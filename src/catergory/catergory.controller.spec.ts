import { Test, TestingModule } from '@nestjs/testing';
import { CatergoryController } from './catergory.controller';

describe('CatergoryController', () => {
  let controller: CatergoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatergoryController],
    }).compile();

    controller = module.get<CatergoryController>(CatergoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
