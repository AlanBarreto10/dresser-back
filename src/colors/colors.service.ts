import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}
  
  async create(createColorDto: CreateColorDto) {
    const newColor = await this.colorRepository.create(createColorDto);
    return this.colorRepository.save(newColor);
  }

  async findAll() {
    return await this.colorRepository.find();
  }

  async findById(id: number) {
    const color = await this.colorRepository.findOne({ where: { id } });
    if(!color)  throw new NotFoundException(`Color no existente en la base de datos.`);
    return color;
  }

  update(id: number, updateColorDto: UpdateColorDto) {
    return `This action updates a #${id} color`;
  }

  async remove(id: number) {
    const color = await this.findById(id);
    await this.colorRepository.remove(color);
  }

  async deleteAllColors() {
    const query = this.colorRepository.createQueryBuilder('colors');

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
