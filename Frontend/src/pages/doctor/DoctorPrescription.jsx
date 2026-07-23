import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import { GETMYPRESCRIPTIONS } from "../../query/doctor/Prescription";
import { useContext, useState } from "react";
import { PaginationContext } from "../../context/PaginationContext";
import AddPrescriptionModal from "../prescriptionModal/AddPrescriptionModal";
import PreviewIcon from "@mui/icons-material/Preview";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewPrescriptionModal from "../prescriptionModal/ViewPrescriptionModal";
import DeletePrescriptionModal from "../prescriptionModal/DeletePrescriptionModal";
import UpdatePrescriptionModal from "../prescriptionModal/UpdatePrescriptionModal";
import FilterModal from "../filter/FilterModal";

const DoctorPrescription = () => {
    const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(PaginationContext);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({
        userName: '',
        department: '',
        medicine: '',
        appointmentDate: ''
    })
    const { data: prescriptionData, loading: prescriptionLoading } = useQuery(GETMYPRESCRIPTIONS,{
        variables: {
            userName: filter.userName,
            department: filter.department,
            medicine: filter.medicine,
            appointmentDate: filter.appointmentDate
        }
    });

    if (prescriptionLoading) return <LoadingCompo />

    const paginatedData = prescriptionData?.getMyPrescriptions?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    ) || [];

    const columnOptions = [
        { label: "Patient", value: "userName" },
        { label: "Department", value: "department" },
        { label: "Medicine", value: "medicine" },
        { label: "Appointment Date", value: "appointmentDate" },
    ];
    const filterField = ["userName", "department", "medicine", "appointmentDate"];

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
                            startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: "#00A7B5",
                                textTransform: "none",
                            }}
                            onClick={() => setAddModalOpen(true)}
                        >
                            Add Prescription
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            sx={{ color: '#00A7B5' }}
                            onClick={()=>{
                                setOpenFilter(true)
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
                            <TableRow sx={{ color: 'white', padding: 2 }}>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>S.No.</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Patient Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Appointment Date</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Medicines</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Duration</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Dosage</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                paginatedData?.map((prescription, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={prescription.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" }, border: '1px solid #b4e8ed' }}
                                        >
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{prescription?.appointment?.user?.userName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                {new Date(prescription?.appointment.availableDate).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{prescription?.appointment?.department}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                <TableCell align="center">
                                                    {Array.isArray(prescription?.medicine)
                                                        ? prescription.medicine.join(", ")
                                                        : prescription?.medicine}
                                                </TableCell>
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{prescription?.duration}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{prescription?.dosage}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                <PreviewIcon
                                                    sx={{ color: '#00A7B5', cursor: 'pointer', mr: 1 }}
                                                    titleAccess="View"
                                                    onClick={() => {
                                                        setSelectedPrescription(prescription);
                                                        setViewModalOpen(true);
                                                    }}
                                                />
                                                <EditIcon
                                                    sx={{ color: '#00A7B5', cursor: 'pointer', mr: 1 }}
                                                    titleAccess="Edit"
                                                    onClick={() => {
                                                        setSelectedPrescription(prescription);
                                                        setEditModalOpen(true);
                                                    }}
                                                />
                                                <DeleteIcon
                                                    sx={{ color: '#00A7B5', cursor: 'pointer' }}
                                                    titleAccess="Delete"
                                                    onClick={() => {
                                                        setSelectedPrescription(prescription);
                                                        setDeleteModalOpen(true);
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
                <AddPrescriptionModal
                    open={addModalOpen}
                    handleClose={() => setAddModalOpen(false)}
                />
                <ViewPrescriptionModal
                    open={viewModalOpen}
                    handleClose={() => setViewModalOpen(false)}
                    prescription={selectedPrescription}
                />
                <DeletePrescriptionModal
                    open={deleteModalOpen}
                    handleClose={() => setDeleteModalOpen(false)}
                    prescription={selectedPrescription}
                />
                <UpdatePrescriptionModal
                    open={editModalOpen}
                    handleClose={() => setEditModalOpen(false)}
                    prescriptionData={selectedPrescription}
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
                    count={prescriptionData?.getMyPrescriptions?.length}
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
export default DoctorPrescription;