import { Product } from "src/products/entities";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(
        () => Product,
        (product) => product.user, 
    )
    products: Product[];
    

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
    @JoinColumn({ name: 'role_id' })
    rol: Role;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date; 

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeInsert()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }
}
