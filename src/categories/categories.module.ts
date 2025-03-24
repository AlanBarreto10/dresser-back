import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
      TypeOrmModule.forFeature([Category, Subcategory]),
    ],
    exports: [TypeOrmModule, CategoriesService]
})
export class CategoriesModule {}
