import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MedicationIcon from "@mui/icons-material/Medication";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Box, Grid, Stack, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardComponent from "../../common/CardDash";
import GroupsIcon from "@mui/icons-material/Groups";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import { GETMYPRESCRIPTIONS } from "../../query/doctor/Prescription";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";

const DoctorDashboard = () => {

    const { userAuth } = useContext(AuthContext);
    const { data: appointmentData, loading: appointmentLoading } = useQuery(GETAPPOINTMENTS);
    const { data: prescriptionData, loading: prescriptionLoading } = useQuery(GETMYPRESCRIPTIONS);

    if ( appointmentLoading || prescriptionLoading) return <LoadingCompo />

    const totalMyAppointments = appointmentData?.getAppointments?.filter((apointment) => {
        return apointment?.doctor?.user?.id === userAuth.id;
    }).length;

    const totalMyPrescription = prescriptionData?.getMyPrescriptions?.filter((prescription) => {
        return prescription?.appointment?.doctor?.user?.id === userAuth.id;
    }).length;

    const totalMyPatients = [
        ...new Map(
            appointmentData?.getAppointments
                ?.filter(
                    (appointment) =>
                        appointment?.doctor?.user?.id === userAuth.id
                )
                .map((appointment) => [
                    appointment?.user?.id,
                    appointment?.user,
                ])
        ).values(),
    ].length;

    const totalMyReports = prescriptionData?.getMyPrescriptions?.filter(
        (prescription) =>
            prescription?.appointment?.doctor?.user?.id === userAuth.id
    ).length;

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
                            title="Total Appointments"
                            count={totalMyAppointments}
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
                            title="Total Patients"
                            count={totalMyPatients}
                            bgColor="#E3F2FD"
                            icon={
                                <GroupsIcon
                                    sx={{ color: "#1976D2", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Total Prescriptions"
                            count={totalMyPrescription}
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
                            title="Total Reports"
                            count={totalMyReports}
                            bgColor="#E0F2F1"
                            icon={
                                <AssessmentIcon
                                    sx={{ color: "#00897B", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default DoctorDashboard;


