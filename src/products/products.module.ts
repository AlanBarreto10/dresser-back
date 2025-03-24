import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductImage } from './entities';
import { Category } from 'src/categories/entities/category.entity';
import { Subcategory } from 'src/categories/entities/subcategory.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { User } from 'src/auth/entities/user.entity';
import { Color } from 'src/colors/entities/color.entity';




@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, Category, Subcategory, Size, User, Color]),
  ],
  exports: [TypeOrmModule, ProductsService]
})
export class ProductsModule {}
