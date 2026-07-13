import { emailField, nameField, passwordField, phoneField } from "../constants/const.ts";
import { UserDetails } from "../data/datatypes.ts";

/**
 * User data validation function.
 * Validates user fields such as username, email,
 * password, confirm password, and phone number.
 * 
 * Validation is performed only for fields
 * provided in the inputField array.
 */
export const validateUserData=(userData:UserDetails, inputField:string[]):Boolean=>{

    const {userName, email, password, confirmPassword, newPassword, phone}=userData;

    // user name validate
    if(inputField.includes('userName')){
        if(userName==="" || userName.trim()===""){
            throw new Error("Username is required.");
        }
        if(!nameField.test(userData?.userName)){
            throw new Error("Only letters and spaces are allowed.");
        }
        if(userName?.length<3){
            throw new Error("First name length should be greater or equal to 3.");
        }
    }

    //email validate
    if(inputField.includes('email')){
        if(email==="" || email?.trim()===""){
            throw new Error("Email is required.");
        }
        if(!emailField.test(email)){
            throw new Error("Enter valid email address.");
        }
    }

    // password validate
    if(inputField.includes('password')){
        if(password==="" || password?.trim()===""){
            throw new Error("Password is required.");
        }
        if(!passwordField.test(password)){
            throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8.");
        }
    }

    if(inputField.includes('newPassword')){
        if(newPassword==="" || newPassword?.trim()===""){
            throw new Error("New Password is required.");
        }
        if(!passwordField.test(newPassword)){
            throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8.");
        }
    }

    //confirm password validate
    if(inputField.includes('newPassword') && inputField.includes('password')){
        if(confirmPassword==="" || confirmPassword?.trim()===""){
            throw new Error("Confirm password is required.");
        }
        if(newPassword!==confirmPassword){
            throw new Error("Password does not match.");
        }
    }

    else if(inputField.includes('confirmPassword') && inputField.includes('password')){
        if(confirmPassword==="" || confirmPassword?.trim()===""){
            throw new Error("Confirm password is required.");
        }
        if(password!==confirmPassword ){
            throw new Error("Password does not match.");
        }
    }
    
    //phone number validate
    if(inputField.includes('phone')){
        if(phone==="" || phone?.trim()===""){
            throw new Error("Phone is required.");
        }
        if(!phoneField.test(phone)){
            throw new Error("Enter valid phone number.");
        }
    }
    return true;
}