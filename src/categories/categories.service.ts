import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';

@Injectable()
export class CategoriesService {
 
    constructor(
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>,
      @InjectRepository(Subcategory)
      private readonly subCategoryRepository: Repository<Subcategory>,
    ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({ where: {id} });
    if(!category) throw new NotFoundException(`La categoria no existe en la base de datos.`);   
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    const category = await this.findCategoryById(id);
    await this.categoryRepository.remove(category);
  }

  async deleteAllCategories() {
    const query = this.categoryRepository.createQueryBuilder('categories');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  //!-----------------------------------------SUBCATEGORIES--------------------------------!////

  async createSubcategory(createSubCategoryDto: CreateSubCategoryDto) {
    const { name, categoryName } = createSubCategoryDto;
    const typeCategory = categoryName.toUpperCase().trim();
    
    const category = await this.categoryRepository.findOne({ where: { name: typeCategory } });
    
    if (!category) {
      throw new NotFoundException(`Categoria '${categoryName}' not found`);
    }

    const subcategory = this.subCategoryRepository.create({
      name,
      category,
    });

    await this.subCategoryRepository.save(subcategory);
    
    return subcategory;
  }
  async findOneSubcategoryById(id: number) {
    const subcategory = await this.subCategoryRepository.findOne({ where: {id} });
    if(!subcategory) throw new NotFoundException(`La subcategoria no existe en la base de datos.`);   
    return subcategory;
  }
  async findAllSubcategories() {
    const subcategories = await this.subCategoryRepository.find();
    return subcategories;
  }
  async removeSubcategory(id: number) {
    const subcategory = await this.findOneSubcategoryById(id);
    await this.subCategoryRepository.remove(subcategory);
  }
  updateSubcategory(arg0: number, updateCategoryDto: UpdateCategoryDto) {
    throw new Error('Method not implemented.');
  }

  async deleteAllSubcategories() {
    const query = this.subCategoryRepository.createQueryBuilder('subcategories');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  private handleDBExceptions(error: any): never{
    if(error.code == '23505')
      throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
  

}
