import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ProductImage } from './entities';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ){}
  
  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productDetails } = createProductDto;
      
      // const product = this.productRepository.create({
      //   ...productDetails,
      //   images: images.map( image => this.productImageRepository.create({ url: image})) //infiere la creacion a un producto
      // });

      //await this.productRepository.save(product);
      
      //return {...product, images: images}; //...esparce todos los atributos
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
      }
    });

    return products.map( product => ({ //aplano que quiero de images
      ...product,
      images: product.images?.map(img => img.url)
    }))
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({id});
    if(!product) throw new NotFoundException(`Product not found with id: ${id}`);

    return product;
    
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
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
}
