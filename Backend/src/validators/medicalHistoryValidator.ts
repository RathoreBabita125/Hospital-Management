import { MedicalHistoryDetails } from "../data/datatypes.ts";

/**
 * User data validation function.
 * Validates user fields such as userName, email,
 * password, confirm password, and phone number.
 * 
 * Validation is performed only for fields
 * provided in the inputField array.
 */

export const validateMedicalHistory=(medicalHistoryData:MedicalHistoryDetails, inputField:string[])=>{
    const {diagnosis, symptoms, allergies, treatmentNotes, recommendedTests}=medicalHistoryData;
    if(inputField.includes('diagnosis')){
        if(diagnosis==="" || diagnosis.trim()===""){
            throw new Error("Diagnosis field is required.")
        }
    }
    if(inputField.includes('symptoms')){
        if(symptoms.length===0){
            throw new Error("Diagnosis should not be empty.")
        }
    }
    if(inputField.includes('allergies')){
        if(allergies.length===0){
            throw new Error("allergies should not be empty.")
        }
    }
    if(inputField.includes('treatmentNotes')){
        if(treatmentNotes==="" || treatmentNotes.trim()===""){
            throw new Error("Treatment notes field is required.")
        }
    }
    if(inputField.includes('recommendedTests')){
        if(recommendedTests.length===0){
            throw new Error("Recommended tests field is required.")
        }
    }
    return true;
}