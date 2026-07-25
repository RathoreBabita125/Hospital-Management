import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MedicationIcon from "@mui/icons-material/Medication";
import { Box, Grid, Stack, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardComponent from "../../common/CardDash";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupsIcon from "@mui/icons-material/Groups";
import { useQuery } from "@apollo/client/react";
import { GETUSERS } from "../../query/login/userQuery";
import LoadingCompo from "../../common/Loading";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import { GETALLPRESCRIPTIONS } from "../../query/doctor/Prescription";
import { GETDOCTORS } from "../../query/doctor/doctorQuery";

const AdminDashboard = () => {

    const { userAuth } = useContext(AuthContext);
    const { data: userData, loading: userLoading } = useQuery(GETUSERS);
    const { data: appointmentData, loading: appointmentLoading } = useQuery(GETAPPOINTMENTS);
    const { data: doctorData, loading: doctorLoading } = useQuery(GETDOCTORS);
    const { data: prescriptionData, loading: prescriptionLoading } = useQuery(GETALLPRESCRIPTIONS);

    if(userLoading || appointmentLoading || prescriptionLoading || doctorLoading) return <LoadingCompo/>

    const totalDoctors=doctorData?.getDoctors?.map((doctor)=>doctor).length;

    const totalPatients=userData?.getUsers?.filter((user)=>{
        return user?.role?.roleName==="Patient";
    })
    
    const totalAppointments=appointmentData?.getAppointments?.length;
    const totalPrescription=prescriptionData?.getAllPrescriptions?.length;

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
                            title="Total Appointments"
                            count={totalAppointments}
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
                            title="Total Doctors"
                            count={totalDoctors}
                            bgColor="#E3F2FD"
                            icon={
                                <BadgeIcon
                                    sx={{ color: "#1976D2", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Total Patients"
                            count={totalPatients?.length}
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
                            title="Total Consultations"
                            count={totalPrescription}
                            bgColor="#E8F5E9"
                            icon={
                                <MedicationIcon
                                    sx={{ color: "#2E7D32", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid> 
                </Grid>
            </Box>
        </>
    )
}
export default AdminDashboard;


