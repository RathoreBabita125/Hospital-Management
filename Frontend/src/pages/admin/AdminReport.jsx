import { Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from "@mui/material";
import CardComponent from "../../common/CardDash";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import { PaginationContext } from "../../context/PaginationContext";
import { useContext } from "react";

const AdminReport = () => {

    const { data: appointmentData, loading: appointmentLoading } = useQuery(GETAPPOINTMENTS);
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(PaginationContext);

    if (appointmentLoading) return <LoadingCompo />

    const pendingAppointments = appointmentData?.getAppointments?.filter((appointment) => {
        return appointment.status === "PENDING";
    }).length

    const CompletedAppointments = appointmentData?.getAppointments?.filter((appointment) => {
        return appointment.status === "COMPLETED";
    }).length

    const cancelledAppointments = appointmentData?.getAppointments?.filter((appointment) => {
        return appointment.status === "CANCELLED";
    }).length

    const acceptedAppointments = appointmentData?.getAppointments?.filter((appointment) => {
        return appointment.status === "ACCEPTED";
    }).length


    const reportData = appointmentData?.getAppointments?.reduce((acc, appointment) => {
        const date = appointment.availableDate;
        let existing = acc.find((item) => item.date === date);

        if (!existing) {
            existing = {
                date,
                total: 0,
                pending: 0,
                accepted: 0,
                completed: 0,
                cancelled: 0,
            };
            acc.push(existing);
        }
        existing.total++;

        switch (appointment.status) {

            case "PENDING":
                existing.pending++;
                break;

            case "ACCEPTED":
                existing.accepted++;
                break;

            case "COMPLETED":
                existing.completed++;
                break;

            case "CANCELLED":
                existing.cancelled++;
                break;
        }

        return acc;
    }, []) || [];

    const paginatedDoctors = reportData?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    ) || [];

    return (
        <>
            <Stack sx={{ ml: 3 }}>
                <Toolbar />
                <Stack direction={'row'} spacing={2}>
                    <Typography variant="h4" sx={{ fontWeight: 600, display: 'flex', color: '#00A7B5' }}> Appointment Analytics </Typography>
                </Stack>
                <Grid container spacing={3} sx={{ mt: 5 }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Pending Appointments"
                            count={pendingAppointments}
                            bgColor="#FFF8E1"
                            icon={
                                <PendingActionsIcon
                                    sx={{ color: "#F9A825", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Accepted Appointments"
                            count={acceptedAppointments}
                            bgColor="#E8F5E9"
                            icon={
                                <CheckCircleIcon
                                    sx={{ color: "#43A047", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Completed Appointments"
                            count={CompletedAppointments}
                            bgColor="#E3F2FD"
                            icon={
                                <TaskAltIcon
                                    sx={{ color: "#1E88E5", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Cancelled Appointments"
                            count={cancelledAppointments}
                            bgColor="#FFEBEE"
                            icon={
                                <CancelIcon
                                    sx={{ color: "#E53935", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                </Grid>

                <Toolbar />
                <Stack direction={'row'} spacing={2}>
                    <Typography variant="h4" sx={{ fontWeight: 600, display: 'flex', color: '#00A7B5' }}> Daily Appointment Report </Typography>
                </Stack>

                <TableContainer
                    sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: 2,
                        width: "100%",
                        overflowX: "auto",
                        mt: 5,
                    }}
                >
                    <Table
                        sx={{
                            backgroundColor: "#ffffff",
                            width: "100%",
                            minWidth: 900,
                        }}
                    >
                        <TableHead sx={{ backgroundColor: "#00A7B5" }}>
                            <TableRow>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>
                                    Appointment Date
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>
                                    Total Appointments
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>
                                    Pending
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>
                                    Accepted
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>
                                    Completed
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>
                                    Cancelled
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedDoctors?.map((report, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                        {new Date(report.date).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{report.total}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{report.pending}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{report.accepted}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{report.completed}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{report.cancelled}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
            </Stack>
        </>
    )
}
export default AdminReport;