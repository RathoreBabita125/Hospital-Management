export const checkValidInput = (inputFields, setError, user, validateFields) => {
    const newError = {};
    let isValidInput = true;

    inputFields.forEach(field => {
        const errorMessage = validateFields(field, user[field], user);
        newError[field] = errorMessage;
        if (errorMessage) isValidInput = false;
    });
    setError(newError);
    return isValidInput;
}