import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { screenSchema, behindCameraSchema, frontCameraSchema, CPUSchema, storageSchema, 
    connectionSchema, designAndWeightSchema, pinSchema, entertainmentAndAppSchema, productSchema } from '../schemas/app.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'Product', schema: productSchema },
        { name: 'Screen', schema: screenSchema },
        { name: 'BehindCamera', schema: behindCameraSchema },
        { name: 'FrontCamera', schema: frontCameraSchema },
        { name: 'CPU', schema: CPUSchema },
        { name: 'Storage', schema: storageSchema },
        { name: 'Connection', schema: connectionSchema },
        { name: 'DesignAndWeight', schema: designAndWeightSchema },
        { name: 'Pin', schema: pinSchema },
        { name: 'EntertainmentAndApp', schema: entertainmentAndAppSchema },
    ])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
