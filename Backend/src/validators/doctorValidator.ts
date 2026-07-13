import { nameField } from "../constants/const.ts";
import { DoctorDetails } from "../data/datatypes.ts";

/**
 * Doctor data validation function.
 * Validates required doctor fields such as
 * department, specialization, experience,
 * and consultation fee.
 */
export const validateDoctor=(doctorData:DoctorDetails, inputField:string[])=>{

     // Validate department field
    if(inputField.includes('department')){
        if(doctorData.department==="" || doctorData?.department?.trim()===""){
            throw new Error("Department is required.")
        }
        if(!nameField.test(doctorData.department)){
            throw new Error("Only space and letters are allowed.")
        }
    }

    // Validate specialization field
    if(inputField.includes('specialization')){
        if(doctorData.specialization==="" || doctorData?.specialization?.trim()===""){
            throw new Error("Specialization is required.")
        }
        if(!nameField.test(doctorData.specialization)){
            throw new Error("Only space and letters are allowed.")
        }
    }

    // Validate experience field
    if(inputField.includes('experience')){
        if(!doctorData.experience){
            throw new Error("Experience is required.")
        }
    }

    // Validate consultationFee field
    if(inputField.includes('consultationFee')){
        if(!doctorData.consultationFee){
            throw new Error("Consultation fee is required.")
        }
    }

    return true;
}