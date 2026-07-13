import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.ts";

/**
 * Prescription entity.
 * Stores medicines and instructions prescribed
 * for a specific appointment.
*/
@Entity()
export class Prescription {
    // Unique identifier for the prescription
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text', array:true })
    medicine!: string[];

    @Column({ type: 'text' })
    dosage!: string;

    @Column({ type: 'text' })
    duration!: string;

    @Column({ type: 'text' })
    instructions!: string;

    @OneToOne(() => Appointment)
    @JoinColumn({ name: "appointmentId" })
    appointment!: Appointment;

}