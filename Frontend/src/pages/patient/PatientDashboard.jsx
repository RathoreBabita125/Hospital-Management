import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Box, Grid, Stack, Toolbar, Typography } from "@mui/material";
import CardComponent from "../../common/CardDash";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PatientDashboard = () => {
    const { userAuth } = useContext(AuthContext);
    console.log("inside patient", userAuth);

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                <Toolbar />
                <Stack direction={'row'} spacing={2}>
                    <Typography variant="h4" sx={{  fontWeight: 600, display: 'flex' }}> Welcome </Typography>
                    <Typography variant="h4" sx={{ color: '#00A7B5', fontWeight: 600 }}>{userAuth?.userName}</Typography>
                </Stack>
                <Grid container spacing={3} sx={{ mt: 5 }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="My Appointments"
                            count={12}
                            bgColor="#E3F2FD"
                            icon={
                                <EventAvailableIcon
                                    sx={{ color: "#1976D2", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Upcoming"
                            count={2}
                            bgColor="#FFF8E1"
                            icon={
                                <CalendarMonthIcon
                                    sx={{ color: "#F9A825", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Prescriptions"
                            count={8}
                            bgColor="#E8F5E9"
                            icon={
                                <MedicationIcon
                                    sx={{ color: "#2E7D32", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Medical Records"
                            count={15}
                            bgColor="#F3E5F5"
                            icon={
                                <MedicalInformationIcon
                                    sx={{ color: "#8E24AA", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Reports"
                            count={5}
                            bgColor="#E0F2F1"
                            icon={
                                <AssessmentIcon
                                    sx={{ color: "#00897B", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Doctors Consulted"
                            count={4}
                            bgColor="#FCE4EC"
                            icon={
                                <MedicalServicesIcon
                                    sx={{ color: "#D81B60", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default PatientDashboard;


