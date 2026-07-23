import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Doctor } from "./doctor.ts";

/**
 *  @module DoctorAvailability/Entity.
 *  stores doctor available dates and time slots
 */

@Entity()
export class DoctorAvailability {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  availableDate!: Date;

  @Column({ type: "time" })
  fromTime!: string;

  @Column({ type: "time" })
  toTime!: string;

  @Column({ type: 'bool', default: false })
  isBooked!: boolean;

  @ManyToOne(() => Doctor, (doctor) => doctor.availability, {
    onDelete: "CASCADE",
  })
  doctor!: Doctor;
}