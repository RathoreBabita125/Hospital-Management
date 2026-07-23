import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./appointment.ts";
import { User } from "./user.ts";
import { DoctorAvailability } from "./doctorAvailability.ts";

/**
 *  @module Doctor/Entity.
 * Stores professional details of doctors
 */

@Entity()
export class Doctor {
    // Unique identifier for the doctor
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    department!: string

    @Column({ type: 'text' })
    specialization!: string

    @Column({ type: 'int' })
    experience!: number

    @Column({ type: 'int' })
    consultationFee!: number

    @Column({ type: 'boolean' })
    status!: boolean

    @CreateDateColumn({type:'date'})
    createdAt!:Date

    @UpdateDateColumn({type:'date'})
    updatedAt!:Date

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointment!: Appointment[]

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User

    @OneToMany(() => DoctorAvailability, (availability) => availability.doctor, {
        cascade:true
    })
    availability!: DoctorAvailability[]
}

