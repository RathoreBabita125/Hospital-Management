import { Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import CardComponent from "../../common/CardDash";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";

const AdminReport = () => {
    return (
        <>
            <Stack>
                <Toolbar />
                <Stack direction={'row'} spacing={2}>
                    <Typography variant="h4" sx={{ fontWeight: 600, display: 'flex', color: '#00A7B5' }}> Appointment Analytics </Typography>
                </Stack>
                <Grid container spacing={3} sx={{ mt: 5 }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Pending Appointments"
                            count={12}
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
                            count={8}
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
                            count={35}
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
                            count={4}
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
                                <TableCell align="center" sx={{ color: "white", fontSize: 18 }}>
                                    Date
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18 }}>
                                    Total Appointments
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18 }}>
                                    Pending
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18 }}>
                                    Accepted
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18 }}>
                                    Completed
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18 }}>
                                    Cancelled
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {[
                                {
                                    date: "10 Jul 2026",
                                    total: 18,
                                    pending: 4,
                                    accepted: 6,
                                    completed: 7,
                                    cancelled: 1,
                                },
                                {
                                    date: "11 Jul 2026",
                                    total: 22,
                                    pending: 5,
                                    accepted: 8,
                                    completed: 7,
                                    cancelled: 2,
                                },
                                {
                                    date: "12 Jul 2026",
                                    total: 16,
                                    pending: 3,
                                    accepted: 5,
                                    completed: 6,
                                    cancelled: 2,
                                },
                            ].map((report, index) => (
                                <TableRow
                                    key={index}
                                    hover
                                    sx={{
                                        "&:last-child td": {
                                            borderBottom: "none",
                                        },
                                    }}
                                >
                                    <TableCell align="center">{report.date}</TableCell>
                                    <TableCell align="center">{report.total}</TableCell>
                                    <TableCell align="center">{report.pending}</TableCell>
                                    <TableCell align="center">{report.accepted}</TableCell>
                                    <TableCell align="center">{report.completed}</TableCell>
                                    <TableCell align="center">{report.cancelled}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Stack>
        </>
    )
}
export default AdminReport;