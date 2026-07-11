import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.ts";
import { User } from "./user.ts";

@Entity()
export class Doctor{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'text'})
    department!:string

    @Column({type:'text'})
    specialization!:string

    @Column({type:'int'})
    experience!:number

    @Column({type:'date'})
    availableDays!:Date

    @Column({type:'int'})
    consultationFee!:number

    @Column({type:'boolean'})
    status!:boolean

    @OneToMany(()=>Appointment, (appointment)=>appointment.doctor)
    appointment!:Appointment[]

    @OneToOne(()=>User)
    @JoinColumn({ name: "userId" })
    user!:User
}

