import { BadRequestException, Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, Screen, BehindCamera, FrontCamera, CPU, Storage, Connection, DesignAndWeight, Pin, EntertainmentAndApp } from '../schemas/app.schema';
import { CreateProductDTO } from 'src/dto/app.dto';
import e from 'express';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly ProductModel: Model<Product>,
        @InjectModel('Screen') private readonly ScreenModel: Model<Screen>,
        @InjectModel('BehindCamera') private readonly BehindCameraModel: Model<BehindCamera>,
        @InjectModel('FrontCamera') private readonly FrontCameraModel: Model<FrontCamera>,
        @InjectModel('CPU') private readonly CPUModel: Model<CPU>,
        @InjectModel('Storage') private readonly StorageModel: Model<Storage>,
        @InjectModel('Connection') private readonly ConnectionModel: Model<Connection>,
        @InjectModel('DesignAndWeight') private readonly DesignAndWeightModel: Model<DesignAndWeight>,
        @InjectModel('Pin') private readonly PinModel: Model<Pin>,
        @InjectModel('EntertainmentAndApp') private readonly EntertainmentAndAppModel: Model<EntertainmentAndApp>
        ) {
    }

    async createProduct(CreateProductDTO: CreateProductDTO): Promise<string> {
        try {
            
            const newScreen = new this.ScreenModel(CreateProductDTO.screen);
            const newBehindCamera = new this.BehindCameraModel(CreateProductDTO.behindCamera);
            const newFrontCamera = new this.FrontCameraModel(CreateProductDTO.frontCamera);
            const newCPU = new this.CPUModel(CreateProductDTO.CPU);
            const newStorage = new this.StorageModel(CreateProductDTO.storage);
            const newConnection = new this.ConnectionModel(CreateProductDTO.connection);
            const newDesignAndWeight = new this.DesignAndWeightModel(CreateProductDTO.designAndWeight);
            const newPin = new this.PinModel(CreateProductDTO.pin);
            const newEntertainmentAndApp = new this.EntertainmentAndAppModel(CreateProductDTO.entertainmentAndApp);
            
            const resultScreen = await newScreen.save();
            const resultBehindCamera = await newBehindCamera.save();
            const resultFrontCamera = await newFrontCamera.save();
            const resultCPU = await newCPU.save();
            const resultStorage = await newStorage.save();
            const resultConnection = await newConnection.save();
            const resultDesignAndWeight = await newDesignAndWeight.save();
            const resultPin = await newPin.save();
            const resultEntertainmentAndApp = await newEntertainmentAndApp.save();

            delete CreateProductDTO.screen;
            delete CreateProductDTO.behindCamera;
            delete CreateProductDTO.frontCamera;
            delete CreateProductDTO.CPU;
            delete CreateProductDTO.storage;
            delete CreateProductDTO.connection;
            delete CreateProductDTO.designAndWeight;
            delete CreateProductDTO.pin;
            delete CreateProductDTO.entertainmentAndApp;
            
            const newProductDTO = {
                ...CreateProductDTO,
                screen: resultScreen.id,
                behindCamera: resultBehindCamera.id,
                frontCamera: resultFrontCamera.id,
                CPU: resultCPU.id,
                storage: resultStorage.id,
                connection: resultConnection.id,
                designAndWeight: resultDesignAndWeight.id,
                pin: resultPin.id,
                entertainmentAndApp: resultEntertainmentAndApp.id,
            }

            const newProduct = new this.ProductModel(newProductDTO);
            const result = await newProduct.save();
            return result.id;
        } catch (error) {
            throw new MethodNotAllowedException('Not allowed to create product!');
        }
    }

    async getListProducts(): Promise<Object> {
        try {
            const listProduct = await this.ProductModel.find()
                .populate("screen")
                .populate("behindCamera")
                .populate("frontCamera")
                .populate("CPU")
                .populate("storage")
                .populate("connection")
                .populate("designAndWeight")
                .populate("pin")
                .populate("entertainmentAndApp")
                .exec();
            const count = await this.ProductModel.countDocuments({}).exec();
            return {
                items: [...listProduct],
                _count: count
            };
        } catch (error) {
            throw new BadRequestException('Can not get list product!');
        }
    }

    async getProduct(id: string): Promise<Object> {
        try {
            const product = await this.ProductModel.findById(id)
                .populate("screen")
                .populate("behindCamera")
                .populate("frontCamera")
                .populate("CPU")
                .populate("storage")
                .populate("connection")
                .populate("designAndWeight")
                .populate("pin")
                .populate("entertainmentAndApp")
                .exec();
            if (product) {
                return product;
            } else {
                throw new NotFoundException('Can not find product!');
            }
        } catch (error) {
            throw new NotFoundException('Can not find product!');
        }
    }

    // async updateProduct(id: string, productDTO: productDTO): Promise<Product> {
    //     try {
    //         await this.productModel.findByIdAndUpdate(id, productDTO);
    //         const updatedProduct = await this.productModel.findById(id);
    //         return updatedProduct;
    //     } catch (error) {
    //         throw new NotFoundException('Can not find product!');
    //     }
    // }

    async deleteProduct(id: string): Promise<Object> {
        try {

            const product = await this.ProductModel.findById(id).exec();

            await this.ScreenModel.findByIdAndDelete(product.screen);
            await this.BehindCameraModel.findByIdAndDelete(product.behindCamera);
            await this.FrontCameraModel.findByIdAndDelete(product.frontCamera);
            await this.CPUModel.findByIdAndDelete(product.CPU);
            await this.StorageModel.findByIdAndDelete(product.storage);
            await this.ConnectionModel.findByIdAndDelete(product.connection);
            await this.DesignAndWeightModel.findByIdAndDelete(product.designAndWeight);
            await this.PinModel.findByIdAndDelete(product.pin);
            await this.EntertainmentAndAppModel.findByIdAndDelete(product.entertainmentAndApp);
            await this.ProductModel.findByIdAndDelete(id);

            return { status: true, msg: 'Delete product successfully!'};
        } catch (error) {
            throw new NotFoundException('Can not find product!');
        }
    }

    async getListProductsByCatergory(id: String): Promise<Object[]> {
        try {
            const listProduct = await this.ProductModel.find()
                .where('catergory').equals(id)
                .populate("screen")
                .populate("behindCamera")
                .populate("frontCamera")
                .populate("CPU")
                .populate("storage")
                .populate("connection")
                .populate("designAndWeight")
                .populate("pin")
                .populate("entertainmentAndApp")
                .exec();
            return [...listProduct];
        } catch (error) {
            throw new BadRequestException('Can not get list product!');
        }
    }
}
