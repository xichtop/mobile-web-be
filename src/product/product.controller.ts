import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDTO } from '../dto/app.dto';
import { Product } from '../schemas/app.schema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Post()
    async createProduct(@Body() createProductDTO: CreateProductDTO): Promise<Object> {
        const productId = await this.productService.createProduct(createProductDTO);
        return { id: productId }
    }

    @Get()
    async getListProducts(): Promise<Object> {
        const listProduct = await this.productService.getListProducts();
        return listProduct;
    }

    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Object> {
        const product = await this.productService.getProduct(id);
        return product;
    }

    // @Patch(':id') 
    // async updateProduct(@Param('id') id: string, @Body() productDTO: productDTO): Promise<Product> {
    //     const product = await this.productService.updateProduct(id, productDTO);
    //     return product;
    // }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<Object> {
        const result = await this.productService.deleteProduct(id);
        return result;
    }

    @Get('/catergory/:id')
    async getListProductsByCatergory(@Param('id') id: string): Promise<Object[]> {
        const listProduct = await this.productService.getListProductsByCatergory(id);
        return listProduct;
    }
}
