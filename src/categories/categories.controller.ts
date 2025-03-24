import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('subcategories')
  findAllSubcategories() {
    return this.categoriesService.findAllSubcategories();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findCategoryById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }

  //!------------------------------SUBCATEGORIES------------------------------!//
  @Post('subcategories')
  createSubcategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.categoriesService.createSubcategory(createSubCategoryDto);
  }

 

  @Get('subcategories/:id')
  findOneSubcategory(@Param('id') id: string) {
    return this.categoriesService.findOneSubcategoryById(+id);
  }

  @Patch('subcategories/:id')
  updateSubcategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateSubcategory(+id, updateCategoryDto);
  }

  @Delete('subcategories/:id')
  removeSubcategory(@Param('id') id: string) {
    return this.categoriesService.removeSubcategory(+id);
  }
}
