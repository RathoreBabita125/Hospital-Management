import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Doctor } from "./doctor.ts";
import { User } from "./user.ts";
import { AppointmentStatus } from "../data/datatypes.ts";
import { Document } from "./document.ts";

/**
 * Appointment entity.
 * Represents an appointment scheduled between
 * a patient and a doctor.
 */
@Entity()
export class Appointment{
    // Unique identifier for the appointment
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'text'})
    department!:string;

    @Column({type:'date'})
    availableDate!:Date;

    @Column({type:'time'})
    timeSlot!:string;

    @Column({type:'enum',enum:AppointmentStatus, default:AppointmentStatus.PENDING})
    status!:AppointmentStatus;

    @CreateDateColumn({type:'date'})
    createdAt!:Date;

    @UpdateDateColumn({type:'date'})
    updatedAt!:Date;

    @ManyToOne(()=>Doctor, (doctor)=>doctor.appointment)
    doctor!:Doctor;

    @ManyToOne(()=>User)
    user!:User;

    @OneToMany(()=>Document, (document)=>document.appointment)
    document!:Document[]
}