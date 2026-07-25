import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Doctor } from "./doctor.ts";
import { TimeSlot } from "./timeSlot.ts";
import { TimeSlotStatus } from "../data/datatypes.ts";

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

  @Column({ type: 'int' })
  slotDuration!: number;

  @Column({type: "bool", nullable:true})
  isBooked!: Boolean;

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.availability, {
    onDelete: "CASCADE",
  })
  timeSlot!: TimeSlot[];

  @ManyToOne(() => Doctor, (doctor) => doctor.availability, {
    onDelete: "CASCADE",
  })
  doctor!: Doctor;
}