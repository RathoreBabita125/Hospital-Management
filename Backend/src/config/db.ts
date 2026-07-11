import { DataSource } from 'typeorm';
import { User } from '../modals/user.ts';
import { Role } from '../modals/role.ts';
import { Doctor } from '../modals/doctor.ts';
import { Appointment } from '../modals/appointment.ts';

export const AppDataSource=new DataSource({
    type:'postgres',
    username:"postgres",
    password:"Cel%Bd@2026",
    database:"Hospital Management",
    synchronize:true,
    port:5432,
    entities:[User, Role, Doctor, Appointment]
});