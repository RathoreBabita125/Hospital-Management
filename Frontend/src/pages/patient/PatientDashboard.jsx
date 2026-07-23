import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Box, Grid, Stack, Toolbar, Typography } from "@mui/material";
import CardComponent from "../../common/CardDash";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@apollo/client/react";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import { GETALLPRESCRIPTIONS } from "../../query/doctor/Prescription";
import LoadingCompo from "../../common/Loading";

const PatientDashboard = () => {

    const { userAuth } = useContext(AuthContext);
    const { data: appointmentData, loading: appointmentLoading } = useQuery(GETAPPOINTMENTS);
    const { data: prescriptionData, loading: prescriptionLoading } = useQuery(GETALLPRESCRIPTIONS);

    if (appointmentLoading || prescriptionLoading) return <LoadingCompo />;

    const myAppointments =
        appointmentData?.getAppointments?.filter(
            (appointment) => appointment.user.id === userAuth.id
        ) || [];

    const consultedDoctors = prescriptionData?.getAllPrescriptions?.filter((prescription) => {
        return prescription?.appointment?.user?.id === userAuth.id;
    })

    const today = new Date();

    const upcomingAppointments = myAppointments.filter((appointment) => {
        return (
            new Date(appointment.availableDate) >= today &&
            appointment.status !== "CANCELLED"
        );
    });

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                <Toolbar />
                <Stack direction={'row'} spacing={2}>
                    <Typography variant="h4" sx={{ fontWeight: 600, display: 'flex' }}> Welcome </Typography>
                    <Typography variant="h4" sx={{ color: '#00A7B5', fontWeight: 600 }}>{userAuth?.userName}</Typography>
                </Stack>
                <Grid container spacing={3} sx={{ mt: 5 }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="My Appointments"
                            count={myAppointments.length}
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
                            title="Total Consultations"
                            count={consultedDoctors.length}
                            bgColor="#FCE4EC"
                            icon={
                                <MedicalServicesIcon
                                    sx={{ color: "#D81B60", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Upcoming Appointments"
                            count={upcomingAppointments.length}
                            bgColor="#FFF8E1"
                            icon={
                                <CalendarMonthIcon
                                    sx={{ color: "#F9A825", fontSize: 32 }}
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


