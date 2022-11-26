import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { CatergoryService } from './catergory.service';
import { CreateCatergoryDTO } from '../dto/app.dto';
import { Catergory } from 'src/schemas/app.schema';


@Controller('catergory')
export class CatergoryController {

    constructor(private catergoryService: CatergoryService) { }

    @Post()
    async createCatergory(@Body() createCatergoryDTO: CreateCatergoryDTO): Promise<Object> {
        const catergoryId = await this.catergoryService.createCatergory(createCatergoryDTO);
        return { id: catergoryId }
    }

    @Get()
    async getListCatergories(): Promise<Catergory[]> {
        const listCatergories = await this.catergoryService.getListCatergories();
        return listCatergories;
    }

    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Object> {
        const product = await this.catergoryService.getCatergory(id);
        return product;
    }
}
