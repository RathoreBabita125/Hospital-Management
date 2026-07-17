import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from '../../query/login/userQuery';
import { useMutation } from '@apollo/client/react';
import { handleOnBlurInput } from '../../validators/handleOnBlur';
import { toast } from 'react-toastify';
import { client } from '../../client/client';
import { validateFormFields } from '../../validators/formValidator';
import { inputValueHandler } from '../../validators/inputValueHandler';
import { checkValidInput } from '../../validators/checkValidInput';

const Login = () => {
    // GraphQL mutation for login 
    const [login] = useMutation(LOGIN);

    // State to toggle password visibility
    const [showVisible, setShowVisible] = useState({
        password: false,
    });

    // State to store login form values
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({
        email: "",
        password: "",
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

    // Handles user login process
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const inputField = ["email", "password"];
            const isValid = checkValidInput(inputField, setError, user, validateFormFields);

            // Stop API request if validation fails
            if (!isValid) {
                return;
            }

            // Execute GraphQL Login mutation
            const response = await login({
                variables: {
                    email: user.email,
                    password: user.password,
                }
            });

            // Display success notification
            toast.success("You have logged in successfully!!!");
            
            // Redirect user to login page
            await client.resetStore();
            navigate('/dashboard')
            console.log(response);

            // Reset login form after successful signup
            setUser({
                email: "",
                password: "",
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
                <Box sx={{ width: 500, backgroundColor: 'white', padding: 10, borderRadius: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#00A7B5' }}>Sign in</Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            error={error.email}
                            helperText={error.email ? error.email : ''}
                            onBlur={handleOnBlur}
                            label="Email"
                            variant="outlined"
                            color="primary" />
                        <TextField
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            error={error.password}
                            helperText={error.password ? error.password : ''}
                            onBlur={handleOnBlur}
                            type={showVisible.password ? "text" : "password"}
                            label="Password"
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
                        <Stack direction={'row'} sx={{ justifyContent: 'space-between', marginTop: 2, textAlign: 'center' }}>
                            <Link to='/forget'><Typography sx={{ cursor: 'pointer', color: '#053348' }}>Forgot password?</Typography></Link>
                        </Stack>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#00A7B5', padding: 1, fontSize: 18 }}
                            onClick={handleLogin}
                        >Sign in</Button>
                        <Stack direction={'row'} spacing={1}>
                            <Typography variant="body1" sx={{ color: 'gray' }}>Don't have an Account? </Typography>
                            <Link to='/register'><Typography sx={{ color: '#00A7B5', cursor: 'pointer' }}><strong>Sign up</strong></Typography></Link>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}
export default Login;