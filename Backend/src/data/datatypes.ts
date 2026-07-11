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
  token?:string;
}

export type DoctorDetails={
  id:number;
  userName:string;
  email:string;
  password:string;
  phone:string;
  department:string;
  specialization:string;
  experience:number;
  availableDays:Date;
  consultationFee:number
  status:boolean
}
