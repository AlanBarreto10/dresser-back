import { Category } from "src/categories/entities/category.entity";
import { Product } from "src/products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('sizes')
export class Size {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', {
        unique: true
    }) 
    name: string;

    @ManyToOne(
        () => Category, 
        (category) => category.sizes
    )
    category: Category;

    @BeforeInsert()
    @BeforeUpdate()
    formatName() {
        this.name = this.name.toUpperCase().trim();
    }
}