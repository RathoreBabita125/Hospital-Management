export const validatePassword = (passwordData, setErrors ) => {
    const newErrors = {};

    if (!passwordData.password.trim()) {
        newErrors.password = "Old password is required";
    }

    if (!passwordData.newPassword.trim()) {
        newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
        newErrors.newPassword =
            "Password must be at least 8 characters";
    }

    if (!passwordData.confirmPassword.trim()) {
        newErrors.confirmPassword =
            "Confirm password is required";
    } else if (
        passwordData.confirmPassword !==
        passwordData.newPassword
    ) {
        newErrors.confirmPassword =
            "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};