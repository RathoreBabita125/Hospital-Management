import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./doctor.ts";

enum AppointmentStatus{
    CONFIRMED="CONFIRMED",
    PENDING="PENDING",
    COMPLETED="COMPLETED",
    CANCELLED="CANCELLED"
}

@Entity()
export class Appointment{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'text'})
    departmentName!:string;

    @Column({type:'date'})
    availableDate!:Date;

    @Column({type:'time'})
    timeSlot!:string;

    @Column({type:'enum',enum:AppointmentStatus, default:AppointmentStatus.PENDING})
    appointmentStatus!:AppointmentStatus;

    @ManyToOne(()=>Doctor, (doctor)=>doctor.appointment)
    doctor!:Doctor;

//    @ManyToOne(()=)
}