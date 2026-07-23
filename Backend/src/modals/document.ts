import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./appointment.ts";

/**
 *  @module Document/Entity.
 */

@Entity()
export class Document{
    // Unique identifier for the document
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:"text"})
    fileName!:string;

    @Column({type:'text'})
    fileType!:string;

    @Column({type:"text"})
    documentType!:string;

    @Column({type:'text'})
    fileUrl!:string;

    @CreateDateColumn({type:'date'})
    createdAt!:Date;

    @UpdateDateColumn({type:'date'})
    updatedAt!:Date;

    @ManyToOne(()=>Appointment, (appointment)=>appointment.document, {
        onDelete:'CASCADE'
    })
    appointment!:Appointment;
}