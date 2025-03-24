import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { Size } from './entities/size.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [SizesController],
  providers: [SizesService],
  imports: [
    TypeOrmModule.forFeature([Size]),
    CategoriesModule
  ],
  exports: [TypeOrmModule, SizesService]
})
export class SizesModule {}
