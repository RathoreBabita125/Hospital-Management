import { useQuery } from "@apollo/client/react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import LoadingCompo from "../../common/Loading";
import PreviewIcon from "@mui/icons-material/Preview";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useContext, useState } from "react";
import { PaginationContext } from "../../context/PaginationContext";
import FilterModal from "../filter/FilterModal";
import ViewAppointmentModal from "../appointmentModal/AppointmentModal";

const AdminAppointment = () => {

    const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(PaginationContext);
    const [openFilter, setOpenFilter] = useState(false);
    const [openViewAppointment, setOpenViewAppointment]=useState(false);
    const [selectAppointment, setSelectAppointment]=useState(null);

    const [filter, setFilter] = useState({
        doctorName: '',
        userName: '',
        department: '',
        specialization: '',
        appointStatus: ''
    })

    const { data: appointmentData, loading: appointmentLoading } = useQuery(GETAPPOINTMENTS, {
        variables: {
            doctorName: filter.doctorName,
            userName: filter.userName,
            department: filter.department,
            specialization: filter.specialization,
            status:filter.appointStatus
        }
    });

    if (appointmentLoading) return <LoadingCompo />

    const paginatedDoctors = appointmentData?.getAppointments?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    ) || [];

    const columnOptions = [
        { label: "Doctor", value: "doctorName" },
        { label: "Patient", value: "userName" },
        { label: "Department", value: "department" },
        { label: "Specialization", value: "specialization" },
        { label: "Status", value: "appointStatus" },
    ];
    
    const filterField = [
        "doctorName",
        "userName",
        "department",
        "specialization",
        "appointStatus"
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
                        Appointment Management
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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
                            <TableRow sx={{ color: 'white' }}>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>S. No.</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Patient Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Doctor Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Specialization</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Appointment Date</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Time Slot</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Consultation Fee</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Booked On</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                paginatedDoctors?.map((appointment, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={appointment.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" } }}
                                        >
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.user.userName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.doctor.user.userName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.department}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.doctor.specialization}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                {new Date(appointment?.availableDate).toLocaleDateString("en-GB")}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.timeSlot}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.doctor.consultationFee}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{appointment.status}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                               {new Date(appointment?.createdAt).toLocaleDateString("en-GB")}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                <PreviewIcon sx={{ color: '#00A7B5', cursor: 'pointer' }} 
                                                onClick={()=>{
                                                    setSelectAppointment(appointment);
                                                    setOpenViewAppointment(true);
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
                <ViewAppointmentModal
                    open={openViewAppointment}
                    handleClose={() => setOpenViewAppointment(false)}
                    setOpenViewAppointment={setOpenViewAppointment}
                    selectAppointment={selectAppointment}
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
                    count={appointmentData?.getAppointments?.length}
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
export default AdminAppointment;
