import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { Gender } from "../utils/enum_gender";
import { Subcategory } from "src/categories/entities/subcategory.entity";
import { Size } from "src/sizes/entities/size.entity";
import { Color } from "src/colors/entities/color.entity";

@Entity({name : 'products'})
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
    images: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.products,
        { eager: true, onDelete: 'CASCADE' }
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
        (size) => size,
    )
    size: Size;
    
    @ManyToOne(
        () => Color,
        (color) => color.products,
        {onDelete: 'CASCADE'}
    )
    @JoinColumn({ name: 'color', referencedColumnName: 'id' })
    color: Color;

    @Column('int', {
        default: 0
    })
    likes: number;


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date; 

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date; 

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
