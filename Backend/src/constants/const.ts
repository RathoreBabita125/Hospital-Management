/**
 * Common validation patterns and application constants
 * used across application.
 * @module constants/validation
 */

export const nameField = /^[A-Za-z ]*$/;
export const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const phoneField = /^[6-9]\d{9}$/;
export const numberField=/^[0-9]+$/;
export const dateField=/^\d{4}-\d{2}-\d{2}$/;


// Supported document/image file extensions
export const allowedFileTypes = [ "pdf", "jpeg", "png", "jpg"];

//doctor form input fields
export const doctorInputFields = ["userName", "email", "password", "phone", "department", "specialization", "experience", "consultationFee", "availableDate", "status"];





