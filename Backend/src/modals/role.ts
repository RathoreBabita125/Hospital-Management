import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.ts";

/**
 * Role entity.
 * Defines user roles and maintains the relationship
 * with associated users.
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