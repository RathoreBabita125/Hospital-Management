import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import { GETPRESCRIPTIONS } from "../../query/doctor/Prescription";


const DoctorPrescription = () => {
    // const { data: prescriptionData, loading: prescriptionLoading } = useQuery(GETPRESCRIPTIONS);
    // if (prescriptionLoading) return <LoadingCompo />

    // console.log("pres", prescriptionData);

    const {
        data: prescriptionData,
        loading,
        error,
    } = useQuery(GETPRESCRIPTIONS);

    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Data:", prescriptionData);


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
                        Prescriptions Details
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                            variant="contained"

                            sx={{
                                backgroundColor: "#00A7B5",
                                textTransform: "none",
                            }}
                        >
                            Add Prescription
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
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Patient Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Appointment Date</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Medicines</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Duration</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Dosage</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                prescriptionData?.getPrescriptions?.map((prescription) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={prescription.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" } }}
                                        >
                                            <TableCell align="center">{prescription.id}</TableCell>
                                            <TableCell align="center">{prescription?.appointment?.user?.userName}</TableCell>
                                            <TableCell align="center">{prescription?.appointment?.availableDate}</TableCell>
                                            <TableCell align="center">{prescription?.appointment?.department}</TableCell>
                                            <TableCell align="center">{prescription?.medicine}</TableCell>
                                            <TableCell align="center">{prescription?.duration}</TableCell>
                                            <TableCell align="center">{prescription?.dosage}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="outlined"
                                                    sx={{ color: '#00A7B5' }}
                                                // onClick={handleCancel}
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
export default DoctorPrescription;