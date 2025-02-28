import { Product } from "src/products/entities";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    email: string;

    @Column('text',{
        unique: true,
        select: false
    })
    password: string;

    @Column('text')
    name: string;

    @Column('bool',{
        default: true
    })
    isActive: boolean;

    @ManyToOne(
        () => Product,
        (product) => product.images,
    )
    product: Product;

    @Column('text', {
        default: 'email'
    })
    provider: string;

    //corresponden a UN ROL
    @ManyToOne(
        () => Role,
        (role) => role.users,
        { eager: true }
    )
    @JoinColumn({ name: 'rol', referencedColumnName: 'type' })
    rol: Role;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeInsert()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }
}
