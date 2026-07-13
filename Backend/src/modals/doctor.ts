import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.ts";
import { User } from "./user.ts";

/**
 * Doctor entity.
 * Stores professional details of doctors
 * and links each doctor to a user account.
 */
@Entity()
export class Doctor{
    // Unique identifier for the doctor
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

