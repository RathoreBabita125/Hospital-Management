import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./appointment.ts";

@Entity()
export class MedicalHistory{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'text'})
    diagnosis!:string;

    @Column({type:'text', array:true})
    symptoms!:string[];

    @Column({type:'text', array:true})
    allergies!:string[];

    @Column({type:'text'})
    treatmentNotes!:string;

    @Column({type:"text", nullable:true})
    treatmentPlan!: string;

    @Column({type:"text", array:true, nullable:true})
    recommendedTests!: string[];

    @Column({type:"date", nullable:true})
    followUpDate!: Date;

    @CreateDateColumn({type:'date'})
    createdAt!:Date

    @UpdateDateColumn({type:'date'})
    updatedAt!:Date

    @OneToOne(()=>Appointment)
    @JoinColumn({ name: "appointmentId" })
    appointment!:Appointment;
}