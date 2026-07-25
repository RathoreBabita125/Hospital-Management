import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Doctor } from "./doctor.ts";
import { User } from "./user.ts";
import { AppointmentStatus } from "../data/datatypes.ts";
import { Document } from "./document.ts";
import { Prescription } from "./prescription.ts";

/**
 * @module Appointment/Entity.
 */

@Entity()
export class Appointment {
    
    // Unique identifier for the appointment
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    department!: string;

    @Column({ type: 'date' })
    availableDate!: Date;

    @Column({ type: 'text' })
    timeSlot!: string;

    @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.CONFIRMED })
    status!: AppointmentStatus;

    @CreateDateColumn({ type: 'date' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'date' })
    updatedAt!: Date;

    @ManyToOne(() => Doctor, (doctor) => doctor.appointment, {
        onDelete: "CASCADE"
    })
    doctor!: Doctor;

    @ManyToOne(() => User)
    user!: User;

    @OneToOne(() => Prescription,(prescription) => prescription.appointment)
    prescription!: Prescription;

    @OneToMany(() => Document, (document) => document.appointment)
    document!: Document[]
}