import { useQuery } from "@apollo/client/react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import LoadingCompo from "../../common/Loading";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PaginationContext } from "../../context/PaginationContext";
import FilterModal from "../filter/FilterModal";

const DoctorPatient = () => {

    const { userAuth } = useContext(AuthContext);
    const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(PaginationContext);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({
        userName: '',
        email: '',
        bloodGroup: '',
        gender: ''
    })
    const { data: appointmentData, loading: appointmentLoading } = useQuery(GETAPPOINTMENTS,{
        variables: {
            userName: filter.userName,
            email: filter.email,
            bloodGroup: filter.bloodGroup,
            gender: filter.gender
        }
    });

    if (appointmentLoading) return <LoadingCompo />

    const myAppointments = appointmentData?.getAppointments?.filter((appointment) => {
        return userAuth.id === appointment?.doctor?.user?.id;
    }) || [];

    const patientMap = new Map();

    myAppointments.forEach((appointment) => {
        const patientUserId = appointment?.user?.id;
        if (!patientUserId) return;

        const visitDate = new Date(appointment.availableDate);
        const prescriptionCount = appointment.prescriptions?.length || 0;

        if (!patientMap.has(patientUserId)) {
            patientMap.set(patientUserId, {
                id: patientUserId,
                userName: appointment.user.userName,
                phone: appointment.user.phone,
                bloodGroup: appointment.user.patient?.bloodGroup,
                lastVisit: visitDate,
                totalVisit: 1,
                totalPrescription: prescriptionCount,
                gender: appointment.user.patient?.gender,
                email: appointment.user.email
            });
        } else {
            const existing = patientMap.get(patientUserId);
            existing.totalVisit += 1;
            existing.totalPrescription += prescriptionCount;
            if (visitDate > existing.lastVisit) {
                existing.lastVisit = visitDate;
            }
        }
    });

    const myPatients = Array.from(patientMap.values());

    const paginatedData = myPatients.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const columnOptions = [
        { label: "Patient", value: "userName" },
        { label: "Email", value: "email" },
        { label: "Blood Group", value: "bloodGroup" },
        { label: "Gender", value: "gender" },
    ];
    const filterField = ["userName", "email", 'bloodGroup', "gender"]

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
                        My Patients
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            sx={{ color: '#00A7B5' }}
                            onClick={()=>setOpenFilter(true)}
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
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>S.No.</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Patient Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Phone</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Blood Group</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Gender</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Last Visit</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Total Visit</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                paginatedData?.map((patient, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={patient.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" }, border: '1px solid #b4e8ed' }}
                                        >
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient.userName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient.phone}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient.bloodGroup}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient.gender}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                {new Date(patient.lastVisit).toLocaleDateString("en-GB")}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient.totalVisit}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient.email}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <FilterModal
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                    setOpenFilter={setOpenFilter}
                    setFilter={setFilter}
                    setPage={setPage}
                    filter={filter}
                    columnOptions={columnOptions}
                    filterField={filterField}
                    filter={filter}
                />
                <TablePagination
                    component="div"
                    count={myPatients.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 15, 20, 25]}
                    sx={{ backgroundColor: '#00A7B5', color: 'white' }}
                />
            </Box>
        </>
    )
}
export default DoctorPatient;