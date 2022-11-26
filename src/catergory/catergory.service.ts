import { Model } from 'mongoose';
import { Injectable, MethodNotAllowedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Catergory } from 'src/schemas/app.schema';
import { CreateCatergoryDTO } from 'src/dto/app.dto';

@Injectable()
export class CatergoryService {
  constructor(@InjectModel("Catergory") private readonly catergoryModel: Model<Catergory>) {}

  async createCatergory(createCatergoryDto: CreateCatergoryDTO): Promise<string> {
    try {
      const newCatergory = new this.catergoryModel(createCatergoryDto);
      const result = await newCatergory.save();
      return result.id 
    } catch (error) {
      throw new MethodNotAllowedException('Not allowed to create catergory!');
    }
  }

  async getListCatergories(): Promise<Catergory[]> {
    try {
      const listCatergories = await this.catergoryModel.find().exec();
      return [...listCatergories];
    } catch (error) {
      throw new BadRequestException('Can not get list product!');
    }
  }

  async getCatergory(id: string): Promise<Object> {
    try {
        const catergory = await this.catergoryModel.findById(id).exec();
        if (catergory) {
            return catergory;
        } else {
            throw new NotFoundException('Can not find product!');
        }
    } catch (error) {
        throw new NotFoundException('Can not find product!');
    }
}
}

