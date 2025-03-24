import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { SizesModule } from 'src/sizes/sizes.module';
import { ColorsModule } from 'src/colors/colors.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AuthModule,
    CategoriesModule,
    SizesModule,
    ColorsModule,
    ProductsModule
  ]
})
export class SeedModule {}
