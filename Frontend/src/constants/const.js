export const nameInputCheck = /^[A-Za-z ]+$/;
export const emailInputCheck = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
export const passwordInputCheck = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const phoneInputCheck = /^[6-9]\d{9}$/;

export const appointmentColumn = ["AppointmentID", "Doctor", "Department", "Available Date", "Time Slot", "Status"];

//doctor form input fields
export const doctorInputFields = ["userName", "email", "password", "phone", "department", "specialization", "experience", "consultationFee", "availableDate", "status"];

// status
export const statusOptions = ["Active", "Inactive"];

// blood Group
export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//gender
export const genders = ["Male", "Female", "Other"];

//appointment status
export const appointmentStatus = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

//prescription field
export const prescriptionInputFields = [
    "appointment",
    "medicine",
    "dosage",
    "duration",
    "instructions",
];

// all departments 
export const allDepartments = [
    "General Medicine",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Gynecology & Obstetrics",
    "Dermatology",
    "Ophthalmology",
    "Dentistry",
    "Psychiatry",
    "Oncology",
    "Gastroenterology",
    "Pulmonology",
    "Nephrology",
    "Urology",
    "Endocrinology",
    "Rheumatology",
    "Radiology",
    "Anesthesiology",
    "Pathology",
    "Physiotherapy"
];

// all specializations
export const specializations = [
    "Cardiologist",
    "Neurologist",
    "Orthopedic Surgeon",
    "Dermatologist",
    "Pediatrician",
    "General Physician",
    "Gynecologist",
    "Psychiatrist",
    "Ophthalmologist",
    "ENT Specialist",
    "Urologist",
    "Nephrologist",
    "Oncologist",
    "Pulmonologist",
    "Endocrinologist",
    "Gastroenterologist",
    "Radiologist",
    "Anesthesiologist",
    "Dentist",
    "Physiotherapist",
];

export const STATUS_TRANSITIONS = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["COMPLETED", "CANCELLED"],
    COMPLETED: [],
    CANCELLED: [],
};

export const showActiveStyle = {
    mx: 1,
    my: 0.5,
    borderRadius: 2,
    transition: "all 0.2s ease",

    "&:hover": {
        backgroundColor: "#E6F7F8",
    },

    "&.Mui-selected": {
        backgroundColor: "#00A7B5",
        color: "#fff",
        fontWeight: 600,
        boxShadow: "0 4px 10px rgba(0,167,181,0.3)",
    },

    "&.Mui-selected .MuiListItemIcon-root": {
        color: "#fff",
    },
}