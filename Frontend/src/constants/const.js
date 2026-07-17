export const nameInputCheck=/^[A-Za-z ]+$/;
export const emailInputCheck=/^[^\s@]+@[^\s@]+.[^\s@]+$/;
export const passwordInputCheck=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const phoneInputCheck=/^[6-9]\d{9}$/;

export const appointmentColumn=["AppointmentID", "Doctor", "Department", "Available Date", "Time Slot", "Status"];

//doctor form input fields
export const doctorInputFields = ["userName", "email", "password", "phone", "department", "specialization", "experience", "consultationFee", "availableDays", "status"];

// all departments 
export const allDepartments=[
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