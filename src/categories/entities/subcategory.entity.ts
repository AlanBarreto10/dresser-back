import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Product } from "src/products/entities";

@Entity('subcategories')
export class Subcategory {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text',{ //ROPA = { REMERA, CAMISETAS, PANTALONES, ETC }, CALZADO = { ZAPATO, ZAPATILLA, BOTINES, ETC} , ACCESORIOS = { CARTERA, SOMBRERO, ETC. }.
        unique: true
    })
    name: string;

    @ManyToOne(
        () => Category,
        (category) => category.subCategories,
        { eager: true }
    )
    @JoinColumn({ name: 'category', referencedColumnName: 'name' })
    category: Category;

    @OneToMany(
        () => Product,
        (product) => product.subCategory,
        { cascade: true} 
    )
    products?: Product[];

    @BeforeInsert()
    @BeforeUpdate()
    formatName() {
        this.name = this.name.toUpperCase().trim();
    }
    
}