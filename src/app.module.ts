import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CatergoryModule } from './catergory/catergory.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://xichtop:sbTwMofretP8beWe@cluster0.busa9.mongodb.net/?retryWrites=true&w=majority'), 
    ProductModule, 
    CatergoryModule, AuthModule, UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
