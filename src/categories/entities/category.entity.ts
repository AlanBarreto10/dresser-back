import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subcategory } from "./subcategory.entity";
import { Size } from "src/sizes/entities/size.entity";

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

    @OneToMany(
        () => Size,
        (size) => size.category,
        { cascade: true} 
    )
    sizes?: Size[];

    @BeforeInsert()
    @BeforeUpdate()
    formatName() {
        this.name = this.name.toUpperCase().trim();
    }
}
