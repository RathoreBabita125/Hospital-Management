import { dateField, emailField, nameField, passwordField, phoneField } from "../constants/const.ts";
import { DoctorDetails } from "../data/datatypes.ts";

/**
 * @module Doctor/validator
 * Doctor data validation function.
 * Validates required doctor fields such as
 * department, specialization, experience,
 * and consultation fee.
 */

export const validateDoctor=(doctorData:DoctorDetails, inputField:string[])=>{

     // Validate user name field
    if(inputField.includes('userName')){
        if(doctorData.userName==="" || doctorData?.userName?.trim()===""){
            throw new Error("Doctor Name is required.");
        }
        if(!nameField.test(doctorData?.userName)){
            throw new Error("Only space and letters are allowed.");
        }
        if(doctorData?.userName?.length<3){
            throw new Error("Doctor name should be equal or greater than 3 letters.");
        }
    }

    // Validate email field
    if(inputField.includes('email')){
        if(doctorData.email==="" || doctorData?.email?.trim()===""){
            throw new Error("Email is required.")
        }
        if(!emailField.test(doctorData.email)){
            throw new Error("Please enter valid email address.")
        }
    }

    // Validate password field
    if(inputField.includes('password')){
        if(doctorData.password==="" || doctorData?.password?.trim()===""){
            throw new Error("Password is required.")
        }
        if(!passwordField.test(doctorData.password)){
            throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8.")
        }
    }

     // Validate phone field
    if(inputField.includes('phone')){
        if(doctorData.phone==="" || doctorData?.phone?.trim()===""){
            throw new Error("Phone is required.")
        }
        if(!phoneField.test(doctorData.phone)){
            throw new Error("Enter valid phone number.")
        }
    }

     // Validate department field
    if(inputField.includes('department')){
        if(doctorData.department==="" || doctorData?.department?.trim()===""){
            throw new Error("Department is required.")
        }
    }

    // Validate specialization field
    if(inputField.includes('specialization')){
        if(doctorData.specialization==="" || doctorData?.specialization?.trim()==="" || !doctorData.specialization){
            throw new Error("Specialization is required.")
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
    
    // Validate qualification field
    if(inputField.includes('qualification')){
        if(!doctorData.qualification){
            throw new Error("Qualification is required.")
        }
    }

    // Validate address field
    if(inputField.includes('address')){
        if(!doctorData.address){
            throw new Error("Address is required.")
        }
    }

    // Validate available date field
    if(inputField.includes('status')){
        if(!doctorData.status){
            throw new Error("Status is required.")
        }
    }

    return true;
}