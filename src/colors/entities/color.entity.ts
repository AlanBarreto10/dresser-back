import { Product } from "src/products/entities";
import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Color {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', {
        unique: true
    }) 
    name: string;

    @Column({ nullable: false })
    codigo_hexadecimal: string;

    @OneToMany(
        () => Product, 
        (product) => product.color,
        {cascade: true}
    )
    products?: Product[];

    @BeforeInsert()
    @BeforeUpdate()
    renameColorHex(){
        this.codigo_hexadecimal = '#'+this.codigo_hexadecimal;
    }

    @BeforeInsert()
    @BeforeUpdate()
    formatName() {
        this.name = this.name.toUpperCase().trim();
        this.codigo_hexadecimal = this.codigo_hexadecimal.toLocaleUpperCase().trim();
    }
}
