import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from '../src/modules/users/roles.controller';
import { RolesService } from '../src/modules/users/roles.service';

describe('RolesController', () => {
    let controller: RolesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RolesController],
            providers: [RolesService],
        }).compile();

        controller = module.get<RolesController>(RolesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});