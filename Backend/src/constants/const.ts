/**
 * Common validation patterns and application constants
 * used across the Hospital Management System.
 */

export const nameField = /^[A-Za-z ]*$/;
export const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const phoneField = /^[6-9]\d{9}$/;
export const numberField=/^[0-9]+$/


// all departments 
export const departments:string[]=[
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

// Supported document/image file extensions
export const allowedFileTypes = [ "pdf", "jpeg", "png", "jpg"];



