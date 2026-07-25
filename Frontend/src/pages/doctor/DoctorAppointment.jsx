import { useQuery } from "@apollo/client/react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import LoadingCompo from "../../common/Loading";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PaginationContext } from "../../context/PaginationContext";
import FilterModal from "../filter/FilterModal";
import EditIcon from "@mui/icons-material/Edit";
import ChangeStatusModal from "../doctorModal/ChangeStatus";

const DoctorAppointment = () => {

    const { userAuth } = useContext(AuthContext);
    const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(PaginationContext);
    const [openFilter, setOpenFilter] = useState(false);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [filter, setFilter] = useState({
        userName: '',
        gender: '',
        status: ''
    })

    const { data: appointmentData, loading: appointmentLoading, refetch } = useQuery(GETAPPOINTMENTS, {
        variables: {
            userName: filter.userName,
            gender: filter.gender,
            status: filter.status
        },
    });

    if (appointmentLoading) return <LoadingCompo />

    const myAppointments = appointmentData?.getAppointments?.filter((appointment) => {
        return userAuth.id === appointment.doctor.user.id
    })

    const paginatedData = myAppointments.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    ) || [];

    const columnOptions = [
        { label: "Patient", value: "userName" },
        { label: "Gender", value: "gender" },
        { label: "Status", value: "appointStatus" },
    ];
    const filterField = [
        "userName",
        "gender",
        "status"
    ];

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
                        My Appointments
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            sx={{ color: '#00A7B5' }}
                            onClick={() => {
                                setOpenFilter(true);
                            }}
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
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Age</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Gender</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Appointment Date</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Time Slot</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Status</TableCell>
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
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.user?.userName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment?.user?.patient?.age}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.user?.patient?.gender}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.department}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                {new Date(appointment.availableDate).toLocaleDateString("en-GB")}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.timeSlot}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.status}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                <EditIcon
                                                    sx={{ color: '#00A7B5', cursor: 'pointer' }}
                                                    titleAccess="Change Status"
                                                    onClick={() => {
                                                        setSelectedAppointment(appointment);
                                                        setStatusModalOpen(true);
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <ChangeStatusModal
                    open={statusModalOpen}
                    onClose={() => setStatusModalOpen(false)}
                    appointment={selectedAppointment}
                    refetch={refetch}
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
                    count={myAppointments?.length}
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
export default DoctorAppointment;
