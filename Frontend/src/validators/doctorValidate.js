import {
    emailInputCheck,
    nameInputCheck,
    passwordInputCheck,
    phoneInputCheck,
} from "../constants/const";

export const validateDoctorFields = (name, value) => {
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(value);
    selected.setHours(0, 0, 0, 0);

    switch (name) {
        case "userName":
            if (!value?.trim()) return "Doctor name is required.";
            if (value.length < 3)
                return "Doctor name should be at least 3 characters.";
            if (!nameInputCheck.test(value))
                return "Only letters and spaces are allowed.";
            return "";

        case "email":
            if (!value?.trim()) return "Email is required.";
            if (!emailInputCheck.test(value))
                return "Enter a valid email address.";
            return "";

        case "password":
            if (!value?.trim()) return "Password is required.";
            if (!passwordInputCheck.test(value))
                return "Minimum 8 characters with uppercase, lowercase, number & special character.";
            return "";

        case "phone":
            if (!value?.trim()) return "Phone number is required.";
            if (!phoneInputCheck.test(value))
                return "Enter a valid 10-digit mobile number.";
            return "";

        case "department":
            if (!value?.trim()) return "Department is required.";
            return "";

        case "specialization":
            if (!value?.trim()) return "Specialization is required.";
            return "";

        case "experience":
            if (!value) return "Experience is required.";
            if (Number(value) < 0)
                return "Experience cannot be negative.";
            return "";

        case "consultationFee":
            if (!value) return "Consultation fee is required.";
            if (Number(value) <= 0)
                return "Consultation fee must be greater than 0.";
            return "";

        case "availableDays":
            if (!value) {
                return "Available date is required.";
            }

            if (selected < today) {
                return "Past date cannot be selected.";
            }
            return "";
            
        default:
            return "";
    }
};