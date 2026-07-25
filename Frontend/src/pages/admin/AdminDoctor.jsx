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
import FilterModal from "../filter/FilterModal";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ChangeDoctorStatusModal from "../doctorModal/ChangeDoctorStatus";

const AdminDoctor = () => {
    const [openAddDoctor, setOpenAddDoctor] = useState(false);
    const [openEditDoctor, setOpenEditDoctor] = useState(false);
    const [openDeleteDoctor, setOpenDeleteDoctor] = useState(false);
    const [openViewDoctor, setOpenViewDoctor] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [openStatusModal, setOpenStatusModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(PaginationContext);

    const [filter, setFilter] = useState({
        userName: '',
        department: '',
        specialization: '',
    })

    const { data: doctorData, loading: doctorLoading, refetch } = useQuery(GETDOCTORS, {
        variables: {
            userName: filter.userName,
            department: filter.department,
            specialization: filter.specialization,
        },
    });

    const paginatedDoctors = doctorData?.getDoctors?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    ) || [];

    const columnOptions = [
        { label: "Doctor", value: "userName" },
        { label: "Department", value: "department" },
        { label: "Specialization", value: "specialization" },
    ];

    const filterField = ["userName", "department", "specialization"];

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
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Doctor Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Phone</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Specialization</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Experience</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Consultation Fee</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Available Date</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                paginatedDoctors?.map((doctor, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={doctor.id}
                                            disabled
                                            sx={{
                                                backgroundColor: doctor.status ? "#ffffff" : "#f5f5f5",
                                                opacity: doctor.status ? 1 : 0.5,
                                                "&:last-child td": { borderBottom: "none" },
                                                border: '1px solid #b4e8ed',
                                            }}
                                        >
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.user.userName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.user.phone}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.department}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.specialization}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.experience}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.consultationFee}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                { doctor?.availability.length>0 ? new Date(doctor?.availability[0]?.availableDate).toLocaleDateString("en-GB") : '-'}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{doctor.status ? "Active" : "Inactive"}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                <Stack direction={'row'} spacing={0.6}>
                                                    <PreviewIcon sx={{ color: '#00A7B5', cursor: 'pointer', pointerEvents: doctor.status ? "auto" : "none", }}
                                                        onClick={() => {
                                                            setOpenViewDoctor(true);
                                                            setSelectedDoctor(doctor);
                                                        }}
                                                    />
                                                    <EditOutlinedIcon sx={{ color: '#00A7B5', cursor: 'pointer', pointerEvents: doctor.status ? "auto" : "none", }}
                                                        onClick={() => {
                                                            setOpenEditDoctor(true);
                                                            setSelectedDoctor(doctor);
                                                        }}
                                                    />
                                                    <DeleteIcon sx={{ color: '#00A7B5', cursor: 'pointer', pointerEvents: doctor.status ? "auto" : "none", }}
                                                        onClick={() => {
                                                            setOpenDeleteDoctor(true);
                                                            setSelectedDoctor(doctor);
                                                        }}
                                                    />
                                                    {
                                                        doctor?.status ?

                                                        <PersonIcon
                                                            sx={{ color: '#00A7B5', cursor: 'pointer' }}
                                                            onClick={() => {
                                                                setOpenStatusModal(true);
                                                                setSelectedDoctor(doctor);
                                                            }}
                                                        />
                                                        :
                                                        <PersonOffIcon
                                                            sx={{ color: '#00A7B5', cursor: 'pointer' }}
                                                            onClick={() => {
                                                                setOpenStatusModal(true);
                                                                setSelectedDoctor(doctor);
                                                            }}
                                                        />
                                                    }

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
                    refetch={refetch}
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
                <ChangeDoctorStatusModal
                    open={openStatusModal}
                    onClose={() => setOpenStatusModal(false)}
                    selectedDoctor={selectedDoctor}
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
                    count={doctorData?.getDoctors?.length}
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
export default AdminDoctor;