import {
    Box,
    Button,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useContext, useEffect, useState } from "react";
import { COMPLETEPROFILE } from "../../query/patient/completeProfile";
import { useMutation } from "@apollo/client/react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";

const CompletePatientProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        age: "",
        gender: "",
        bloodGroup: "",
        dateOfBirth: "",
        address: "",
        emergencyNumber: ""
    })
    const [completePatientProfile] = useMutation(COMPLETEPROFILE);
    const { userAuth, refetchAuth } = useContext(AuthContext);

    useEffect(() => {
        if (userAuth?.patient) {
            navigate("/dashboard", { replace: true });
        }
    }, [userAuth, navigate]);

    const handleInput = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setProfile({ ...profile, [name]: value });
    }

    const handleSaveProfile = async (event) => {
        event.preventDefault();

        try {
            const response = await completePatientProfile({
                variables: {
                    age: Number(profile.age),
                    gender: profile.gender,
                    bloodGroup: profile.bloodGroup,
                    address: profile.address,
                    dateOfBirth: profile.dateOfBirth,
                    emergencyNumber: profile.emergencyNumber,
                },
            });
            console.log(response);
            toast.success("You have completed your profile");
            await refetchAuth();

            setProfile({
                age: "",
                gender: "",
                bloodGroup: "",
                dateOfBirth: "",
                address: "",
                emergencyNumber: ""
            });
            navigate('/dashboard');
        } catch (error) {      
            if (error.message.includes("Profile already completed")) {
                await refetchAuth();   
                toast.success("Profile already completed.");          
                navigate("/dashboard", { replace: true });
                return;
            }
            toast.error(error.message);
        }
    };
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#00A7B5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 950,
                    p: 5,
                    borderRadius: 4,
                }}
            >
                <Stack direction={'column'} spacing={4} sx={{ padding: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 4,
                            gap: 2,
                        }}
                    >
                        <PersonAddAlt1Icon
                            sx={{
                                fontSize: 40,
                                color: "#00A7B5",
                            }}
                        />

                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#00A7B5' }}>
                                Complete Patient Profile
                            </Typography>

                            <Typography color="text.secondary">
                                Fill in the required information to complete your medical profile.
                            </Typography>
                        </Box>
                    </Box>

                    <Stack direction={'column'} spacing={2} sx={{ width: 500 }}>
                        <TextField
                            fullWidth
                            label="Age"
                            type="number"
                            name="age"
                            value={profile.age}
                            onChange={handleInput}
                        />
                        <TextField
                            select
                            fullWidth
                            label="Gender"
                            name="gender"
                            value={profile.gender}
                            onChange={handleInput}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            label="Blood Group"
                            name="bloodGroup"
                            value={profile.bloodGroup}
                            onChange={handleInput}
                        >
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            type="date"
                            name="dateOfBirth"
                            value={profile.dateOfBirth}
                            onChange={handleInput}
                            label="Date of Birth"
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Address"
                            name="address"
                            value={profile.address}
                            onChange={handleInput}
                        />
                        <TextField
                            fullWidth
                            label="Emergency Number"
                            name="emergencyNumber"
                            value={profile.emergencyNumber}
                            onChange={handleInput}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                minWidth: 180,
                                bgcolor: "#00A7B5",
                                borderRadius: 2,
                                textTransform: "none",
                                fontSize: 16,
                                "&:hover": {
                                    bgcolor: "#00838F",
                                },
                            }}
                            onClick={handleSaveProfile}
                        >
                            Save Profile
                        </Button>
                    </Stack>

                </Stack>
            </Paper>
        </Box>
    );
};
export default CompletePatientProfile;