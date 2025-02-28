import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from ".";

@Entity('sizes')
export class Size {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', {
        unique: true
    }) 
    name: string;

    @OneToMany(
        () => Product,
        (product) => product.subCategory,
        { cascade: true} 
    )
    products?: Product[];
}