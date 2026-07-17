import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { FORGET } from '../../query/login/userQuery';
import { handleOnBlurInput } from '../../validators/handleOnBlur';
import { toast } from 'react-toastify';
import { checkValidInput } from '../../validators/checkValidInput';
import { validateFormFields } from '../../validators/formValidator';
import { inputValueHandler } from '../../validators/inputValueHandler';

const Forget = () => {

    // GraphQL mutation for forget passwod 
    const [forget] = useMutation(FORGET);

    // State to toggle password visibility
    const [showVisible, setShowVisible] = useState({
        password: false,
        confirmPassword: false
    });

    // State to store forget form values
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Hook for page navigation
    const navigate = useNavigate();

    // Handles input value updates and clears validation errors
    const handleChange = (event) => {
        inputValueHandler(event, user, setUser, error, setError, validateFormFields)
    }

    // Performs field-level validation when an input loses focus
    const handleOnBlur = (event) => {
        handleOnBlurInput(event, setError, user, validateFormFields)
    }

    // Handles user registration process
    const handleForget = async (event) => {
        event.preventDefault();
        try {
            const inputField = ["email", "password", "confirmPassword"];
            const isValid = checkValidInput(inputField, setError, user, validateFormFields);

            // Stop API request if validation fails
            if (!isValid) {
                return;
            }

            // Execute GraphQL forget mutation
            const response = await forget({
                variables: {
                    email: user.email,
                    password: user.password,
                    confirmPassword: user.confirmPassword,
                }
            });

            // Display success notification
            toast.success("You have created new password successfully!!!");

            // Redirect user to login page
            navigate('/login')
            console.log(response);

            // Reset forget form after successful signup
            setUser({
                email: "",
                password: "",
                confirmPassword: "",
            });

        } catch (error) {
            // Display error notification if registration fails
            toast.error(error.message)
            console.log(error);
        }
    }

    return (
        <>
            <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00A7B5' }}>
                <Stack spacing={2} sx={{ width: 500, backgroundColor: 'white', padding: 10, borderRadius: 4 }}>
                    <Typography variant='h4' sx={{ color: '#00A7B5', fontWeight: 700, mb: 2 }}>Forget Password</Typography>
                    <TextField
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        error={error.email}
                        helperText={error.email ? error.email : ''}
                        onBlur={handleOnBlur}
                        label="Email"
                        variant="outlined"
                        color="success" />
                    <TextField
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        error={error.password}
                        helperText={error.password ? error.password : ''}
                        onBlur={handleOnBlur}
                        type={showVisible.password ? "text" : "password"}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, password: !pre.password }))}>
                                            {showVisible.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        label="New password"
                        variant="outlined"
                        color="success" />
                    <TextField
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        error={error.confirmPassword}
                        helperText={error.confirmPassword ? error.confirmPassword : ''}
                        onBlur={handleOnBlur}
                        type={showVisible.confirmPassword ? "text" : "password"}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, confirmPassword: !pre.confirmPassword }))}>
                                            {showVisible.confirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        label="Confirm New password"
                        variant="outlined"
                        color="success" />
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#00A7B5', padding: 1, fontSize: 18 }}
                        onClick={handleForget}
                    >Reset Password</Button>
                    <Link to='/login'>
                        <Button variant="text">
                            <ArrowBack sx={{ color: '#00A7B5' }} />
                            <Typography sx={{ color: '#00A7B5' }}>Back to Log in</Typography>
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </>
    )
}
export default Forget;