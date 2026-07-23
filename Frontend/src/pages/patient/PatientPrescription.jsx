import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { GETALLPRESCRIPTIONS } from "../../query/doctor/Prescription";
import { PaginationContext } from "../../context/PaginationContext";
import ViewPrescriptionModal from "../patientModal/ViewPrescription";
import FilterModal from "../filter/FilterModal";

const PatientPrescription = () => {
    const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(PaginationContext);
    const { userAuth } = useContext(AuthContext);
    const [openView, setOpenView] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [openFilter, setOpenFilter] = useState(false);
     const [filter, setFilter] = useState({
        doctorName: "",
        department: "",
    });
    const { data: prescriptionData, loading: prescriptionLoading } = useQuery(GETALLPRESCRIPTIONS, {
        variables: {
            doctorName: filter.doctorName,
            department: filter.department,
        },
    });

    if (prescriptionLoading) return <LoadingCompo />

    const myPrescriptions = prescriptionData?.getAllPrescriptions?.filter((prescription) => {
        return prescription?.appointment?.user?.id === userAuth.id;
    })
   
    const paginatedData = myPrescriptions?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    ) || [];

    const columnOptions = [
        { label: "Doctor", value: "doctorName" },
        { label: "Department", value: "department" },
    ];
    const filterField = ["doctorName", "department"];

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
                        My Prescriptions
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
                            <TableRow sx={{ color: 'white', padding: 2 }}>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>S.No.</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Doctor</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Medicine</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Dosage</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Duration</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Instructions</TableCell>
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
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                {prescription?.appointment?.doctor?.user?.userName || "-"}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                {prescription?.appointment?.doctor?.department || "-"}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                {prescription?.medicine?.join(", ") || "-"}
                                            </TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{prescription?.dosage || "-"}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{prescription?.duration || "-"}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{prescription?.instructions || "-"}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                                <Button
                                                    variant="outlined"
                                                    sx={{ color: '#00A7B5' }}
                                                    onClick={() => {
                                                        setOpenView(true)
                                                        setSelectedPrescription(prescription)
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <ViewPrescriptionModal
                    open={openView}
                    onClose={() => setOpenView(false)}
                    prescription={selectedPrescription}
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
                    count={myPrescriptions?.length}
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
export default PatientPrescription;