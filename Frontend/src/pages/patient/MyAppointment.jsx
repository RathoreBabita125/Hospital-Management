import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useQuery } from "@apollo/client/react";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import LoadingCompo from "../../common/Loading";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { PaginationContext } from "../../context/PaginationContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FilterModal from "../filter/FilterModal";
import UpdateAppointmentModal from "../patientModal/UpdateApointment";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CancelAppointmentModal from "../patientModal/CancelAppointment";

const MyAppointment = () => {

    const { userAuth } = useContext(AuthContext);
    const [openFilter, setOpenFilter] = useState(false);
    const [openEditAppoint, setOpenEditAppoint] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [openCancelAppoint, setOpenCancelAppoint] = useState(false);
    const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(PaginationContext);
    
    const [filter, setFilter] = useState({
        doctorName: '',
        department: '',
        appointStatus: ''
    })
    
    const { data: appointmentData, loading: appointmentLoading } = useQuery(GETAPPOINTMENTS, {
        variables: {
            doctorName: filter.doctorName,
            department: filter.department,
            status: filter.appointStatus,
        },
    });

    if (appointmentLoading) return <LoadingCompo />

    const myAppointment = appointmentData?.getAppointments?.filter((appointment) => {
        return appointment.user.id === userAuth.id;
    })

    const paginatedData = myAppointment?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    ) || [];

    const columnOptions = [
        { label: "Doctor", value: "doctorName" },
        { label: "Department", value: "department" },
        { label: "Status", value: "appointStatus" }
    ];
    const filterField = ["doctorName", "department", "appointStatus"]

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
                                cursor: 'none'
                            }}
                        >
                            All scheduled Appointments
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            sx={{ color: '#00A7B5' }}
                            onClick={() => setOpenFilter(true)}
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
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>S.No.</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Doctor</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Available Date</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Time Slot</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>CreatedAt</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                paginatedData?.map((appointment, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={appointment.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" }, border: '1px solid #b4e8ed' }}
                                        >
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{rowsPerPage * page + index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.doctor.user.userName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.department}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                {new Date(appointment.availableDate).toLocaleDateString("en-GB")}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.timeSlot}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.status}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                {new Date(appointment.availableDate).toLocaleDateString("en-GB")}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed', gap: 3 }}>
                                                <Stack direction={'row'} spacing={2} sx={{ justifyContent: 'center' }}>
                                                    <EditOutlinedIcon sx={{ color: '#00A7B5', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setOpenEditAppoint(true);
                                                            setSelectedAppointment(appointment);
                                                        }}
                                                    />
                                                    <CancelOutlinedIcon
                                                        sx={{ color: '#00A7B5', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setOpenCancelAppoint(true);
                                                            setSelectedAppointment(appointment);
                                                        }}
                                                    />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <UpdateAppointmentModal
                    open={openEditAppoint}
                    onClose={() => setOpenEditAppoint(false)}
                    selectedAppointment={selectedAppointment}
                    setSelectedAppointment={setSelectedAppointment}
                    setOpenEditAppoint={setOpenEditAppoint}
                />
                <CancelAppointmentModal
                    open={openCancelAppoint}
                    selectedAppointment={selectedAppointment}
                    setOpenCancelAppoint={setOpenCancelAppoint}
                />
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
                    count={myAppointment?.length}
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
export default MyAppointment;