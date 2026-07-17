export type UserDetails = {
  id: number;
  userName: string;
  email: string;
  password: string
  confirmPassword: string;
  newPassword: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  address: string;
  dateOfBirth: string;
  role: string;
};

export interface UserResponse {
  message?: string;
  token?: string;
}

export type DoctorDetails = {
  id: number;
  userName: string;
  email: string;
  password: string;
  phone: string;
  department: string;
  specialization: string;
  experience: number;
  availableDays: Date;
  consultationFee: number
  status: boolean
}

export enum AppointmentStatus {
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export type PrescriptionDetails = {
  id: number;
  medicine: string[];
  dosage: string;
  duration: string;
  instructions: string;
  appointment: number;
}

export type DocumentDetails = {
  id: number;
  fileName: string;
  fileType: string;
  fileUrl: string;
  documentType: string;
  appointment:number
}

export type MedicalHistoryDetails={
  id:number;
  diagnosis:string;
  symptoms:string[];
  allergies:string[];
  treatmentNotes:string;
  treatmentPlan:string;
  recommendedTests:string[];
  followUpDate:Date;
  appointment:number;
}