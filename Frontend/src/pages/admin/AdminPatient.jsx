import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import PreviewIcon from "@mui/icons-material/Preview";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import { useContext } from "react";
import { PaginationContext } from "../../context/PaginationContext";
import { useState } from "react";
import FilterModal from "../filter/FilterModal";
import ViewPatientModal from "../patientModal/patientModal";

const AdminPatient = () => {

    const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(PaginationContext);
    const [openViewPatient, setOpenViewPatient]=useState(false);
    const [selectedPatient, setSelectedPatient]=useState({});
    const [openFilter, setOpenFilter] = useState(false);

    const [filter, setFilter] = useState({
        userName: '',
        department: '',
        email: '',
        bloodGroup: '',
        gender: ''
    });

    const { data: appointmentData, loading: appointmentLoading } = useQuery(GETAPPOINTMENTS, {
        variables: {
            userName: filter.userName,
            department: filter.department,
            email: filter.email,
            bloodGroup: filter.bloodGroup,
            gender: filter.gender
        }
    });

    if (appointmentLoading) return <LoadingCompo />

    const paginatedDoctors = appointmentData?.getAppointments?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    ) || [];

    const columnOptions = [
        { label: "Patient", value: "userName" },
        { label: "Department", value: "department" },
        { label: "Email", value: "email" },
        { label: "Blood Group", value: "bloodGroup" },
        { label: "Gender", value: "gender" },
    ];

    const filterField = ["userName", "department", "email", 'bloodGroup', "gender"];

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
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>S.No.</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Patient Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Gender</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Age</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Phone</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Email</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Blood Group</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Doctor</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff", border: '1px solid #b4e8ed' }}>
                            {
                                paginatedDoctors?.map((patient, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={patient.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" } }}
                                        >
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient?.user?.userName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient?.user?.patient?.gender ? patient?.user?.patient?.gender : '-'}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient?.user?.patient?.age ? patient?.user?.patient?.age : '-'}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient?.user?.phone}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient?.user?.email}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient?.user?.patient?.bloodGroup ? patient?.user?.patient?.bloodGroup : '-'}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient?.doctor?.user?.userName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{patient?.doctor?.department}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                <PreviewIcon 
                                                    sx={{ color: '#00A7B5', cursor: 'pointer' }} 
                                                    onClick={
                                                        ()=>{
                                                            setOpenViewPatient(true);
                                                            setSelectedPatient(patient);
                                                        }
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <ViewPatientModal
                    open={openViewPatient}
                    handleClose={() => setOpenViewPatient(false)}
                    setOpenViewPatient={setOpenViewPatient}
                    selectedPatient={selectedPatient}
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
export default AdminPatient;