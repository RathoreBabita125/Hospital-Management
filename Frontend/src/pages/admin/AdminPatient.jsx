import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import PreviewIcon from "@mui/icons-material/Preview";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";

const AdminPatient = () => {

    const {data:appointmentData, loading:appointmentLoading}=useQuery(GETAPPOINTMENTS);
    if(appointmentLoading) return <LoadingCompo/>

    console.log("patient details are: ", appointmentData);
    

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
                        Patient Management
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
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Patient ID   </TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Patient Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Gender</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Age</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Phone</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Email</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Blood Group</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Doctor</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                appointmentData?.getAppointments?.map((patient) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={patient.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" } }}
                                        >
                                            <TableCell align="center">{patient.id}</TableCell>
                                            <TableCell align="center">{patient.user.userName}</TableCell>
                                            <TableCell align="center">{patient.user.patient.gender}</TableCell>
                                            <TableCell align="center">{patient.user.patient.age}</TableCell>
                                            <TableCell align="center">{patient.user.patient.emergencyNumber}</TableCell>
                                            <TableCell align="center">{patient.user.email}</TableCell>
                                            <TableCell align="center">{patient.user.patient.bloodGroup}</TableCell>
                                            <TableCell align="center">{patient.doctor.user.userName}</TableCell>
                                            <TableCell align="center">{patient.doctor.department}</TableCell>
                                            <TableCell align="center">
                                                <PreviewIcon sx={{color:'#00A7B5', cursor:'pointer'}}/>
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
export default AdminPatient;