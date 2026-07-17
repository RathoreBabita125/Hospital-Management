import { useQuery } from "@apollo/client/react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import LoadingCompo from "../../common/Loading";
import PreviewIcon from "@mui/icons-material/Preview";
import FilterListIcon from "@mui/icons-material/FilterList";

const AdminAppointment = () => {

    const { data: appointmentData, loading: appointmentLoading } = useQuery(GETAPPOINTMENTS);
    if (appointmentLoading) return <LoadingCompo />

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
                        Appointment Management
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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
                            <TableRow sx={{ color: 'white' }}>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Appointment ID   </TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Patient Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Doctor Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Specialization</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Appointment Date</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Time Slot</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Consultation Fee</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Booked On</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                appointmentData?.getAppointments?.map((appointment) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={appointment.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" } }}
                                        >
                                            <TableCell align="center">{appointment.id}</TableCell>
                                            <TableCell align="center">{appointment.user.userName}</TableCell>
                                            <TableCell align="center">{appointment.doctor.user.userName}</TableCell>
                                            <TableCell align="center">{appointment.department}</TableCell>
                                            <TableCell align="center">{appointment.doctor.specialization}</TableCell>
                                            <TableCell align="center">{appointment.availableDate}</TableCell>
                                            <TableCell align="center">{appointment.timeSlot}</TableCell>
                                            <TableCell align="center">{appointment.doctor.consultationFee}</TableCell>
                                            <TableCell align="center">{appointment.status}</TableCell>
                                            <TableCell align="center">{appointment.createdAt}</TableCell>
                                            <TableCell align="center">
                                                <PreviewIcon sx={{ color: '#00A7B5', cursor: 'pointer' }} />
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
export default AdminAppointment;
