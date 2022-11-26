import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { catergorySchema } from 'src/schemas/app.schema';
import { CatergoryController } from './catergory.controller';
import { CatergoryService } from './catergory.service';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'Catergory', schema: catergorySchema },
    ])],
    controllers: [CatergoryController],
    providers: [CatergoryService],
})
export class CatergoryModule {}
