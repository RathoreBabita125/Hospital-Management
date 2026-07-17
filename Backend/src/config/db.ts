/**
 * Application database configuration.
 * Initializes the TypeORM DataSource for the Hospital Management System
 * using PostgreSQL and registers all application entities.
 */

import { DataSource } from 'typeorm';
import { User } from '../modals/user.ts';
import { Role } from '../modals/role.ts';
import { Doctor } from '../modals/doctor.ts';
import { Appointment } from '../modals/appointment.ts';
import { Prescription } from '../modals/prescription.ts';
import { Patient } from '../modals/patient.ts';
import { Document } from '../modals/document.ts';
import { MedicalHistory } from '../modals/medicalHistory.ts';

/**
 * Main database connection instance.
 */

export const AppDataSource=new DataSource({
    type:'postgres',

    // Database authentication credentials
    username:"postgres",
    password:"Cel%Bd@2026",
    database:"Hospital Management",
    synchronize:true,
    port:5432,

    // Registered entity classes
    entities:[User, Role, Doctor, Patient, Appointment, Prescription, Document, MedicalHistory]
});