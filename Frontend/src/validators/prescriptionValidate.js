export const validatePrescriptionFields = (name, value) => {

    switch (name) {
        case "appointment":
            if (!value?.trim()) return "Please select an appointment.";
            return "";

        case "medicine":
            if (!Array.isArray(value) || value.filter((m) => m?.trim()).length === 0)
                return "Please add at least one medicine.";
            return "";

        case "dosage":
            if (!value?.trim()) return "Dosage is required.";
            if (value.length < 2)
                return "Dosage should be at least 2 characters.";
            return "";

        case "duration":
            if (!value?.trim()) return "Duration is required.";
            if (value.length < 2)
                return "Duration should be at least 2 characters.";
            return "";

        case "instructions":
            if (!value?.trim()) return "Instructions are required.";
            if (value.length < 5)
                return "Instructions should be at least 5 characters.";
            return "";

        default:
            return "";
    }
};