import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text',{
        unique: true
    })
    type: string;

    @OneToMany(
        () => User,
        (user) => user.rol,
        { cascade: true} 
    )
    users?: User[];
}