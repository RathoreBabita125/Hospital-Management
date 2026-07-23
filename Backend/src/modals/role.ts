import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.ts";

/**
 * @module Role/Entity
 * Defines user roles
 */

@Entity()
export class Role{
    // Unique identifier for the role
    @PrimaryGeneratedColumn()
    id!:number

    @Column({type:'varchar', length:20})
    roleName!:string

    @OneToMany(()=>User, (user)=>user.role)
    user!:User[]
}