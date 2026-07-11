import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.ts";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'int' })
    age!: number

    @Column({ type: 'varchar', length: 20 })
    gender!: string

    @Column({ type: 'varchar', length: 5 })
    bloodGroup!: string

    @Column({ type: 'text' })
    address!: string

    @Column({ type: 'date' })
    dateOfBirth!: Date

    @Column({type:"varchar", length:15})
    emergencyNumber!:string

    @OneToOne(()=>User)
    user!:User
}