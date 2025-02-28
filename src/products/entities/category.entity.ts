import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subcategory } from "./subcategory.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text',{ //ROPA, CALZADO, ACCESORIO.
        unique: true
    })
    name: string;
    
    @OneToMany(
        () => Subcategory,
        (subcategory) => subcategory.name,
        { cascade: true, nullable: false} 
    )
    subCategories?: Subcategory[];
}