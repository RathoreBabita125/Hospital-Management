import { emailInputCheck, nameInputCheck, passwordInputCheck, phoneInputCheck } from "../constants/const";

export const validateFormFields = (name, value, userData) => {

    switch (name) {
        case 'userName':
            if (value === "" || value?.trim() === "") return "Usename is required.";
            if (value.length < 3) return "userName should be greater than or equal to 3.";
            if (!nameInputCheck.test(value)) return "Only letters and spaces are allowed.";
            return "";

        case 'email':
            if (!value?.trim()) return "Email is required.";
            if (!emailInputCheck.test(value)) return "Enter valid email address.";
            return "";

        case 'password':
            if (!value?.trim()) return "Password is required.";
            if (!passwordInputCheck.test(value)) return "Min 8 chars, include uppercase, lowercase, number & special character.";
            return "";
            
        case 'confirmPassword':
            if (!value?.trim()) return "Confirm password is required.";
            if (!passwordInputCheck.test(value)) return "Min 8 chars, include uppercase, lowercase, number & special character.";
            if (value !== userData?.password) return "Password does not match.";
            return "";

        case 'phone':
            if (!value?.trim()) return "Phone is required.";
            if (!phoneInputCheck.test(value)) return "Enter a valid 10-digit Indian mobile number";
            return "";

        default:
            return "";
    }
}