import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import { Role } from './role.ts';
/**
 * User entity.
 * Stores authentication and basic user information
 * along with assigned application role.
*/
@Entity()
export class User{
    // Unique identifier for the user
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:'varchar', length:100})
    userName!:string

    @Column({type:'varchar', length:255})
    email!:string

    @Column({type:'varchar', length:100})
    password!:string

    @Column({type:'varchar', length:15})
    phone!:string

    @CreateDateColumn({type:'date'})
    createdAt!:Date

    @UpdateDateColumn({type:'date'})
    updatedAt!:Date

    @ManyToOne(()=>Role, (role)=>role.user)
    role!:Role
}

