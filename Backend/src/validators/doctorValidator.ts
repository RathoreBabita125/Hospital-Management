import { nameField } from "../constants/const.ts";
import { DoctorDetails } from "../data/datatypes.ts";

export const validateDoctor=(doctorData:DoctorDetails, inputField:string[])=>{

    if(inputField.includes('department')){
        if(doctorData.department==="" || doctorData?.department?.trim()===""){
            throw new Error("Department is required.")
        }
        if(!nameField.test(doctorData.department)){
            throw new Error("Only space and letters are allowed.")
        }
    }

    if(inputField.includes('specialization')){
        if(doctorData.specialization==="" || doctorData?.specialization?.trim()===""){
            throw new Error("Specialization is required.")
        }
        if(!nameField.test(doctorData.specialization)){
            throw new Error("Only space and letters are allowed.")
        }
    }

    if(inputField.includes('experience')){
        if(!doctorData.experience){
            throw new Error("Experience is required.")
        }
    }

    if(inputField.includes('consultationFee')){
        if(!doctorData.consultationFee){
            throw new Error("Consultation fee is required.")
        }
    }

    return true;
}