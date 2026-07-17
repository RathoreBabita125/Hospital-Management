import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useQuery } from "@apollo/client/react";
import { GETDOCTORS } from "../../query/doctor/doctorQuery";
import LoadingCompo from "../../common/Loading";
import PreviewIcon from "@mui/icons-material/Preview";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import AddDoctorModal from "../doctorModal/AddDoctorModal";
import EditDoctorModal from "../doctorModal/EditDoctorModal";
import DeleteDoctorModal from "../doctorModal/DeleteDoctorModal";
import ViewDoctorModal from "../doctorModal/ViewDoctorModal";
import { PaginationContext } from "../../context/PaginationContext";

const AdminDoctor = () => {
    const [openAddDoctor, setOpenAddDoctor] = useState(false);
    const [openEditDoctor, setOpenEditDoctor] = useState(false);
    const [openDeleteDoctor, setOpenDeleteDoctor] = useState(false);
    const [openViewDoctor, setOpenViewDoctor] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    
    const { data: doctorData, loading: doctorLoading } = useQuery(GETDOCTORS);
    const {page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}=useContext(PaginationContext);

    if (doctorLoading) return <LoadingCompo />

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
                        Doctor Management
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                            variant="contained"
                            startIcon={<PersonAddAlt1Icon />}
                            sx={{
                                backgroundColor: "#00A7B5",
                                textTransform: "none",
                            }}
                            onClick={() => setOpenAddDoctor(true)}
                        >
                            Add Doctor
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
                            <TableRow sx={{ color: 'white' }}>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>S.No.</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '1px solid white' }}>Doctor Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '1px solid white' }}>Phone</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '1px solid white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '1px solid white' }}>Specialization</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '1px solid white' }}>Experience</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '1px solid white' }}>Consultation Fee</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '1px solid white' }}>Available Days</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '1px solid white' }}>Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '1px solid white' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                doctorData?.getDoctors?.map((doctor, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={doctor.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" }, border: '1px solid #b4e8ed' }}
                                        >
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.user.userName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.user.phone}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.department}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.specialization}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.experience}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.consultationFee}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.availableDays}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.status && "Active"}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                <Stack direction={'row'} spacing={1}>
                                                    <PreviewIcon sx={{ color: '#00A7B5', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setOpenViewDoctor(true);
                                                            setSelectedDoctor(doctor);
                                                        }}
                                                    />
                                                    <EditOutlinedIcon sx={{ color: '#00A7B5', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setOpenEditDoctor(true);
                                                            setSelectedDoctor(doctor);
                                                        }}
                                                    />
                                                    <DeleteIcon sx={{ color: '#00A7B5', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setOpenDeleteDoctor(true);
                                                            setSelectedDoctor(doctor);
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
                <AddDoctorModal
                    open={openAddDoctor}
                    handleClose={() => setOpenAddDoctor(false)}
                />
                <EditDoctorModal
                    open={openEditDoctor}
                    handleClose={() => setOpenEditDoctor(false)}
                    selectedDoctor={selectedDoctor}
                    setOpenEditDoctor={setOpenEditDoctor}
                />
                <DeleteDoctorModal
                    open={openDeleteDoctor}
                    handleClose={() => setOpenAddDoctor(false)}
                    setOpenDeleteDoctor={setOpenDeleteDoctor}
                    selectedDoctor={selectedDoctor}
                />
                <ViewDoctorModal
                    open={openViewDoctor}
                    handleClose={() => setOpenAddDoctor(false)}
                    setOpenViewDoctor={setOpenViewDoctor}
                    selectedDoctor={selectedDoctor}
                />
                <TablePagination
                    component="div"
                    count={doctorData?.getDoctors?.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5,10,15,20,25]}
                    sx={{backgroundColor:'#00A7B5', color:'white'}}
                />
            </Box>
        </>
    )
}
export default AdminDoctor;