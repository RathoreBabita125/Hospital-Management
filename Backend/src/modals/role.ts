import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.ts";

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id!:number

    @Column({type:'varchar', length:20})
    roleName!:string

    @OneToMany(()=>User, (user)=>user.role)
    user!:User[]
}