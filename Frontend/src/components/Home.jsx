import { AppBar, Box, Button, Stack, Toolbar, Typography} from "@mui/material";
import { Link } from "react-router";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import homeImage from '../assets/homeImage.jpeg'
import CardCompo from "../common/Card";

const Home = () => {
    return (
        <Box sx={{ height: "100vh" }}>
            {/* Navbar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: "#00A7B5",
                    color: "black",
                    padding:2
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h4" sx={{fontWeight:600, color:'white'}}>
                            HopeCare
                        </Typography>
                    </Box>

                    <Box>
                        <Link to="/register">
                            <Button variant="contained" sx={{ ml: 2 , color:'#00A7B5', backgroundColor:'white'}}>
                                Register
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    pt: 15,
                    px: 8,
                    pb: 8,
                    mt:2
                }}
            >
                <Box flex={1}>
                    <Typography
                        variant="h2"
                        sx={{ mt: 10, color:"#00A7B5", fontWeight:700 }}
                    >
                        Smart Hospital
                        <br />
                        Management System
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mt: 3 }}
                    >
                        Simplify hospital operations by managing doctors,
                        patients, appointments, medical records, and billing
                        from one secure platform.
                    </Typography>

                    <Link to='/login'>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            sx={{mt:3, backgroundColor:'#00A7B5'}}
                        >
                            Sign in to explore System
                        </Button>
                    </Link>
                </Box>

                <Box
                    flex={1}
                    display="flex"
                    justifyContent="center"
                >
                    <img
                        src={homeImage}
                        alt="Hospital"
                        width="90%"
                    />
                </Box>
            </Stack>

            {/* Features */}
            <Box sx={{ px: 8, pb: 8 }}>
                <Typography
                    variant="h4"
                    textAlign="center"
                    fontWeight={700}
                    mb={10}
                    sx={{mb:5, color:'#00A7B5', fontWeight:600}}
                >
                    Why Choose Our Hospital Management System?
                </Typography>

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={4}
                >
                    <CardCompo
                        Icon={MedicalServicesIcon}
                        title=" Doctor Management" 
                        description=" Manage doctor profiles, schedules and departments efficiently."
                    />
                    <CardCompo
                        Icon={EventAvailableIcon}
                        title="Appointment Booking" 
                        description="Schedule and track appointments with real-time availability."
                    />
                    <CardCompo
                        Icon={MonitorHeartIcon}
                        title="Patient Records" 
                        description="Securely maintain patient history, prescriptions and medical reports."
                    />
                   
                </Stack>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    bgcolor: "#00A7B5",
                    color: "white",
                    textAlign: "center",
                    py: 3,
                }}
            >
                <Typography>
                    © 2026 Hopecare. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Home;