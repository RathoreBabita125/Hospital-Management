// Import Material UI components for building the registration form UI
import Button from '@mui/material/Button';
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { handleOnBlurInput } from '../../validators/handleOnBlur';
import { REGISTER } from '../../query/login/userQuery';
import { useMutation } from "@apollo/client/react";
import { toast } from 'react-toastify';
import { validateFormFields } from '../../validators/formValidator';
import { checkValidInput } from '../../validators/checkValidInput';
import { inputValueHandler } from '../../validators/inputValueHandler';


const Register = () => {

    // GraphQL mutation for registering a new user
    const [register] = useMutation(REGISTER);

    // State to toggle password visibility
    const [showVisible, setShowVisible] = useState({
        password: false,
        confirmPassword: false
    });

    // State to store registration form values
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });
    const [error, setError] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
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
    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const inputField = ["userName", "email", "password", "confirmPassword", "phone"];
            const isValid = checkValidInput(inputField, setError, user);

            // Stop API request if validation fails
            if (!isValid) {
                return;
            }

            // Execute GraphQL registration mutation
            const response = await register({
                variables: {
                    userName: user.userName,
                    email: user.email,
                    password: user.password,
                    confirmPassword: user.confirmPassword,
                    phone: user.phone
                }
            });

            // Display success notification
            toast.success("You have successfully registered.");

            // Redirect user to login page
            navigate('/complete-profile')
            console.log(response);

            // Reset registration form after successful signup
            setUser({
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: ""
            });

        } catch (error) {
            // Display error notification if registration fails
            toast.error(error.message)
            console.log(error);
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', backgroundColor: '#00A7B5' }}>
                <FormControl sx={{ marginTop: 2, padding: 7, width: 500, height: 500, borderRadius: 4, backgroundColor: 'white' }}>
                    <Typography variant="h4" color="intial" sx={{ fontWeight: 'bold', mb: 2, color: '#00A7B5' }}>Register Here </Typography>
                    <Stack direction={'column'} spacing={2}>
                        <TextField
                            id='userName'
                            type="text"
                            name="userName"
                            value={user.userName}
                            onChange={handleChange}
                            error={error.userName}
                            helperText={error.userName ? error.userName : ''}
                            onBlur={handleOnBlur}
                            label="Username"
                            variant="outlined"
                            required
                            color="primary" />
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            error={error.email}
                            helperText={error.email ? error.email : ''}
                            onBlur={handleOnBlur}
                            label="Email"
                            variant="outlined"
                            required
                            color="primary" />
                        <TextField
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            error={error.password}
                            helperText={error.password ? error.password : ''}
                            onBlur={handleOnBlur}
                            type={showVisible.password ? "text" : "password"}
                            label="Password"
                            required
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
                            variant="outlined"
                            color="primary" />
                        <TextField
                            id="confirm-password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            error={error.confirmPassword}
                            helperText={error.confirmPassword ? error.confirmPassword : ''}
                            onBlur={handleOnBlur}
                            type={showVisible.confirmPassword ? "text" : "password"}
                            label="Confirm Password"
                            required
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
                            variant="outlined"
                            color="primary"
                        />
                        <TextField
                            id="phone"
                            name="phone"
                            type="number"
                            value={user.phone}
                            onChange={handleChange}
                            error={error.phone}
                            helperText={error.phone ? error.phone : ''}
                            onBlur={handleOnBlur}
                            label="Phone"
                            variant="outlined"
                            required
                            color="primary" />
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#00A7B5', p: 1, fontSize: 18 }}
                            onClick={handleSignup}
                        >
                            Sign Up
                        </Button>
                        <Stack direction={'row'} spacing={1}>
                            <Typography variant="body1" sx={{ color: 'gray' }}>Already have an Account? </Typography>
                            <Link to='/login'><Typography sx={{ color: '#00A7B5', cursor: 'pointer', }}><strong>Sign in</strong></Typography></Link>
                        </Stack>
                    </Stack>
                </FormControl>
            </Box>
        </>
    )
}
export default Register;