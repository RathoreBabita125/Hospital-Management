import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { GETPRESCRIPTIONS } from "../../query/doctor/Prescription";

const PatientPrescription = () => {
    const { data: prescriptionData, loading: prescriptionLoading } = useQuery(GETPRESCRIPTIONS);
    const { userAuth } = useContext(AuthContext);

    if (prescriptionLoading) return <LoadingCompo />

    const myprescription = prescriptionData?.getAppointments?.filter((appointment) => {
        return appointment.user.id === userAuth.id;
    })

    console.log("prescription: ", myprescription);
    

    const handleCancel=async()=>{

    }

    return (
        <>
            <Box sx={{ mt: 15, padding: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "stretch", sm: "center" },
                        gap: 1.5,
                        mb: 2.5,
                        marginTop: 5,
                    }}
                >
                    <Typography variant="h5" sx={{ color: "#00A7B5", fontWeight: 600 }}>
                        My All Appointments
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                            variant="contained"
                            startIcon={<EventAvailableIcon />}
                            sx={{
                                backgroundColor: "#00A7B5",
                                textTransform: "none",
                            }}
                        >
                            Reschedule Appointment
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            sx={{ color: '#00A7B5' }}
                        >
                            Filter
                        </Button>
                    </Box>
                </Box>
                <TableContainer
                    sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: 2,
                        width: "100%",
                        overflowX: "auto",
                    }}
                >
                    <Table sx={{ backgroundColor: "#ffffff", width: "100%", minWidth: 1200, tableLayout: "fixed" }}>
                        <TableHead sx={{ backgroundColor: "#00A7B5", color: 'white', padding: 10 }}>
                            <TableRow sx={{ color: 'white', padding: 2 }}>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>AppointmentID</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Doctor</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Available Date</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Time Slot</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>CreatedAt</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                myprescription?.map((appointment) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={appointment.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" } }}
                                        >
                                            <TableCell align="center">{appointment.id}</TableCell>
                                            <TableCell align="center">{appointment.doctor.user.userName}</TableCell>
                                            <TableCell align="center">{appointment.department}</TableCell>
                                            <TableCell align="center">{appointment.availableDate}</TableCell>
                                            <TableCell align="center">{appointment.timeSlot}</TableCell>
                                            <TableCell align="center">{appointment.status}</TableCell>
                                            <TableCell align="center">{appointment.createdAt}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="outlined"
                                                    sx={{ color: '#00A7B5' }}
                                                    onClick={handleCancel}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
export default PatientPrescription;