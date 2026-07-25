import { Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./doctor.ts";
import { DoctorAvailability } from "./doctorAvailability.ts";
import { TimeSlotStatus } from "../data/datatypes.ts";

@Entity()
export class TimeSlot {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "time" })
    fromTime!: string;

    @Column({ type: "time" })
    toTime!: string;

    @Column({type: "bool"})
    isBooked!: Boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => DoctorAvailability, (availability) => availability.timeSlot,{
        onDelete: "CASCADE",
    })
    availability!: DoctorAvailability

    @ManyToOne(() => Doctor, (doctor) => doctor.timeSlot)
    doctor!: Doctor
}