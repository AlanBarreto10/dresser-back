import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product, ProductImage, Subcategory } from './entities';
import { Size } from './entities/size.entity';


@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, Category, Subcategory, Size])
  ]
})
export class ProductsModule {}
