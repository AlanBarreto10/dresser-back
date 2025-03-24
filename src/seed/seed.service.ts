import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { AuthService } from 'src/auth/auth.service';
import { CategoriesService } from 'src/categories/categories.service';
import { SizesService } from 'src/sizes/sizes.service';
import { initialData } from './data/seed-data';
import { Gender } from 'src/products/utils/enum_gender';
import { DataSource } from 'typeorm';
import { Subcategory } from 'src/categories/entities/subcategory.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { ColorsService } from 'src/colors/colors.service';
import { Color } from 'src/colors/entities/color.entity';


@Injectable()
export class SeedService {

  constructor(
    private readonly authService: AuthService,
    private readonly categoryService: CategoriesService,
    private readonly sizesService: SizesService,
    private readonly colorService: ColorsService,
    private readonly productsService: ProductsService,
    private readonly dataSource: DataSource
  ) {}

  async runRawQuery(query: string) {
    await this.dataSource.query(query);
  }

  async disableForeignKeys() {
    await this.runRawQuery('ALTER TABLE "products" DISABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "product_images" DISABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "users" DISABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "subcategories" DISABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "sizes" DISABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "color" DISABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "categories" DISABLE TRIGGER ALL;');
  }

  async enableForeignKeys() {
    await this.runRawQuery('ALTER TABLE "products" ENABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "product_images" ENABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "users" ENABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "subcategories" ENABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "sizes" ENABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "color" ENABLE TRIGGER ALL;');
    await this.runRawQuery('ALTER TABLE "categories" ENABLE TRIGGER ALL;');
  }

  async deleteAllData() {
    await this.runRawQuery('DELETE FROM "products";'); 
    await this.runRawQuery('DELETE FROM "product_images";'); 
    await this.runRawQuery('DELETE FROM "subcategories";'); 
    await this.runRawQuery('DELETE FROM "sizes";');
    await this.runRawQuery('DELETE FROM "color";');  
    await this.runRawQuery('DELETE FROM "categories";'); 
    await this.runRawQuery('DELETE FROM "users";'); 
    await this.runRawQuery('DELETE FROM "roles";'); 
    
  }

  async runSeed() {

    await this.disableForeignKeys();
    await this.deleteAllData();

    await this.insertNewRoles();
    const users = await this.insertNewUsers();
    const categories = await this.insertNewCategories();
    const subcategories = await this.insertSubCategories();
    const sizes = await this.insertNewSizes();
    const colors = await this.insertNewColors();
    await this.insertNewProducts(users, subcategories, sizes, colors);

    await this.enableForeignKeys();

    return 'SEED EXECUTED';
  }

  private async insertNewProducts(users, subcategories, sizes, colors) {
    await this.productsService.deleteAllProducts();
    

    const products = initialData.products.map(product => {
      // Seleccionar una subcategoría y un tamaño al azar
      const subCategory = this.getRandomElement(subcategories) as Subcategory;
      const size = this.getRandomElement(sizes) as Size;
      const color = this.getRandomElement(colors) as Color;
  
      // Retornar el producto con los valores asignados
      return {
        ...product,
        gender: Gender[product.gender as keyof typeof Gender], 
        userId: users[Math.floor(Math.random() * users.length)].id, 
        subCategoryId: subCategory.id, 
        sizeId: size.id,
        colorId: color.id 
      };
    });

    await Promise.all(
      products.map(product => this.productsService.create(product)) 
    );
  }

  private async insertNewSizes() {
    await this.sizesService.deleteAllSizes();
    await Promise.all(initialData.sizes.map(size => this.sizesService.create(size)));
    const sizes =  await this.sizesService.findAll();
    return sizes;
  }

  private async insertSubCategories() {
    await this.categoryService.deleteAllSubcategories();
    await Promise.all(initialData.subcategories.map(subcategory => this.categoryService.createSubcategory(subcategory)));
    const subcategorias = await this.categoryService.findAllSubcategories();
   
    return subcategorias;
  }

  private async insertNewCategories() {
    
    await this.categoryService.deleteAllCategories();
    await Promise.all(initialData.categories.map(category => this.categoryService.create(category)));
  }

  private async insertNewColors() {
    
    await this.colorService.deleteAllColors();
    await Promise.all(initialData.colors.map(color => this.colorService.create(color)));
    const colors = await this.colorService.findAll();
    return colors;
  }

  private async insertNewUsers() {
    await this.authService.deleteAllUsers();
    return await Promise.all(initialData.users.map(user => this.authService.create(user)));
  }

  private async insertNewRoles() {
    await this.authService.deleteAllRoles();
    await Promise.all(initialData.roles.map(rol => this.authService.createRole(rol)));
  }

  getRandomElement<T>(array: T[]): T | undefined {
    if (array.length === 0) return undefined; // Si el array está vacío, retorna undefined
    const randomIndex = Math.floor(Math.random() * array.length); // Genera un índice aleatorio
    return array[randomIndex]; // Retorna el elemento en ese índice
  }

}
