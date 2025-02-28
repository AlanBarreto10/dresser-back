import { AfterInsert, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { Subcategory } from "./subcategory.entity";
import { Size } from "./size.entity";
import { Gender } from "../utils/enum_gender";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', {
        unique: true
    }) 
    title: string;

    @Column('float')
    price: number;

    @Column('text', {
        nullable: true
    })
    description: string;

    @Column('text', {
        unique: true
    })
    slug: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: false
    })
    gender: Gender;

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true } //elimina en cascada, tambien las imagenes
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true}
    )
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(
        () => Subcategory,
        (subcategory) => subcategory.products,
    )
    @JoinColumn({ name: 'subcategory', referencedColumnName: 'id' })
    subCategory: Subcategory

    @ManyToOne(
        () => Size,
        (size) => size.products,
    )
    @JoinColumn({ name: 'size', referencedColumnName: 'id'  })
    size: Size


    @BeforeInsert()
    checkSlugInsert(){
        
        if(!this.slug) this.slug = this.title;
            
        this.slug = this.title
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
        
    }

    @AfterInsert()
    checkSlugUpdate(){
        
        this.slug = this.title
        .toLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'')
        
    }

}
