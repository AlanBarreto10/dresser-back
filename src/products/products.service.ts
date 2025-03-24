import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ProductImage } from './entities';
import { Subcategory } from 'src/categories/entities/subcategory.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { User } from 'src/auth/entities/user.entity';
import { Color } from 'src/colors/entities/color.entity';


@Injectable()
export class ProductsService {
  

  private readonly logger = new Logger('ProductsService');
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,

    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,

    private readonly dataSource: DataSource
  ){}
  
  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], subCategoryId, sizeId, userId, colorId, ...productDetails } = createProductDto;
      
      const subCategory = await this.subcategoryRepository.findOne({ where: { id: subCategoryId } });
      if (!subCategory) throw new NotFoundException(`Subcategoría con id ${subCategoryId} no encontrada`);

      const size = await this.sizeRepository.findOne({ where: { id: sizeId } });
      if (!size) throw new NotFoundException(`Tamaño con id ${sizeId} no encontrado`);
  
      
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException(`Usuario con id ${userId} no encontrado`);

      const color = await this.colorRepository.findOne({ where: { id: colorId } });
      if (!color) throw new NotFoundException(`Color con id ${colorId} no encontrado`);


      const product = this.productRepository.create({
        ...productDetails,
        subCategory,
        size,
        user,
        color,
        images: images.map( image => this.productImageRepository.create({ url: image})) //infiere la creacion a un producto
      });

      const savedProduct = await this.productRepository.save(product);
      
      return {
        ...savedProduct,
        subCategory: subCategory.name,
        size: size.name,
        user,
        color, 
        images: images
      }; 
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
        user: true,
        subCategory: true,
        size: true,
        color: true
      }
    });

    return products.map( product => ({ 
      ...product,
      subCategory: product.subCategory.name, 
      size: product.size.name,
      color: product.color.name,
      images: product.images?.map(img => img.url)
    }))
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {id},
      relations: ['subCategory', 'size']
    });
    if(!product) throw new NotFoundException(`Product not found with id: ${id}`);
    return {
      ...product, 
      subCategory: product.subCategory.name, 
      size: product.size.name
    };
  }

  async searchBy(filters: {
    term?: string;
    size?: string;
    gender?: string;
    priceMin?: number;
    priceMax?: number;
    subcategory?: string;
    color?: string;
  }) {
    console.log('Filters received in service:', filters);

    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.subCategory', 'subcategory')
      .leftJoinAndSelect('product.size', 'size')
      .leftJoinAndSelect('product.color', 'color')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('user.rol', 'role');
      
  
    // Búsqueda global por "term"
    if (filters.term) {
      query.andWhere(`
        LOWER(product.title) LIKE LOWER(:term)
        OR LOWER(product.description) LIKE LOWER(:term)
        OR LOWER(product.gender::text) LIKE LOWER(:term)
      `, { term: `%${filters.term}%` });
    }
  
    // Filtrar por tamaño (Size)
    if (filters.size) {
      query.andWhere('size.name = :size', { size: filters.size });
    }
  
    // Filtrar por género (Gender)
    if (filters.gender) {
      query.andWhere('product.gender = :gender', { gender: filters.gender });
    }

    if (filters.gender) {
      query.andWhere('product.color = :color', { color: filters.color });
    }
  
    // Filtrar por precio mínimo y máximo
    if (filters.priceMin != null) {
      query.andWhere('product.price >= :priceMin', { priceMin: filters.priceMin });
    }
    if (filters.priceMax != null) {
      query.andWhere('product.price <= :priceMax', { priceMax: filters.priceMax });
    }
  
    // Filtrar por subcategoría
    if (filters.subcategory) {
      query.andWhere('subcategory.name = :subcategory', { subcategory: filters.subcategory });
    }
  
    const results = await query.getMany();

    return results.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      slug: product.slug,
      gender: product.gender,
      likes: product.likes,
      created_at: product.created_at,
      updated_at: product.updated_at,
      images: product.images?.map(img => img.url), // Mapear las imágenes
      subCategory: product.subCategory?.name, // Solo el nombre de la subcategoría
      size: product.size?.name, // Solo el nombre del tamaño
      color: product.color?.name, // Solo el nombre del color
      user: product.user, // Todo el objeto del usuario
    }));
  }
  

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { images, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.findOne({
        where: { id },
        relations: ['images'], 
    });

    if (!product) throw new NotFoundException('Product not found with this id');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        queryRunner.manager.merge(Product, product, toUpdate);

        if (images && images.length > 0) {    
            const newImages = images.map(image => this.productImageRepository.create({ url: image }));
            product.images = [...product.images, ...newImages]; 
        }

        await queryRunner.manager.save(product);
        await queryRunner.commitTransaction();
        await queryRunner.release();

        return this.findOnePlain(id);

    } catch (error) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        this.handleDBExceptions(error);
    }
}

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['subCategory', 'size', 'user', 'images', 'color'] // Opcional si necesitas validaciones antes de eliminar
    });

    if (!product) {
        throw new NotFoundException(`Product not found with id: ${id}`);
    }

    await this.productRepository.remove(product);
  }

  private handleDBExceptions(error: any){
    if(error.code == '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

  async findOnePlain(id: number){ //prox cambiar
    const {images = [] , ...rest} = await this.findOne(id);
    return {
      ...rest,
      images: images.map( img=>img.url)
    }
  }

  async deleteAllProducts(){
    const query =  this.productRepository.createQueryBuilder('product');
    //si estoy en produccion esto no se tiene que llamar.
    try {
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


}
