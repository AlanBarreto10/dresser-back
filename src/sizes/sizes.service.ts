import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class SizesService {
  constructor(
     @InjectRepository(Size)
     private readonly sizeRepository: Repository<Size>,
     @InjectRepository(Category)
     private readonly categoryRepository: Repository<Category>
  ){}
  async create(createSizeDto: CreateSizeDto) {
    
    const {categoryName, ...sizesDetails } = createSizeDto;
    
    const category = await this.categoryRepository.findOne({ where: {name: categoryName}});

    if(!category) throw new NotFoundException(`No existe esa categoria en la base de datos.`);

    const size = await this.sizeRepository.create({
      ...sizesDetails,
      category
    });
    await this.sizeRepository.save(size);
    return size;
  }

  async findAll() {
    const sizes = await this.sizeRepository.find();
    return sizes;
  }

  async findById(id: number) {
    const size = await this.sizeRepository.findOne({where: {id}});
    if(!size)  throw new NotFoundException(`Size no existe en la base de datos.`);
    return size;
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return `This action updates a #${id} size`;
  }

  async remove(id: number) {
    const size = await this.findById(id);
    await this.sizeRepository.remove(size);
  }

  async deleteAllSizes() {
    const query = this.sizeRepository.createQueryBuilder('sizes');

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
