import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonalInjuryIcon from "@mui/icons-material/PersonalInjury";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingCompo from "../common/Loading";
import { Link } from 'react-router-dom';

const Sidebar = ({ drawerWidth, mobileOpen, setMobileOpen }) => {

    const { userAuth, loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingCompo />
    }

    console.log("The users detail: ", userAuth);

    const drawer = (
        <>
            <Box sx={{ width: 300 }}>
                <Toolbar sx={{ height: 100 }}>
                    <Typography variant="h4" color="initial" sx={{ fontWeight: 700, color: '#00A7B5' }}>HopeCare</Typography>
                </Toolbar>
                <Divider />
                <List sx={{ mt: 5 }}>
                    <Link to='/dashboard'
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon sx={{ color: '#00A7B5' }} />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </Link>
                    {userAuth?.role?.roleName == 'Admin' && (
                        <>
                            <Link to='/dashboard/admin-doctors'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <MedicalServicesIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Doctor Management" />
                                </ListItemButton>
                            </Link>

                            <Link to='/dashboard/admin-patients'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonalInjuryIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Patient Management" />
                                </ListItemButton>
                            </Link>

                            <Link to='/dashboard/admin-appointments'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <EventAvailableIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Appointment Management" />
                                </ListItemButton>
                            </Link>

                            <Link to='/dashboard/admin-reports'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AssessmentIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Reports" />
                                </ListItemButton>
                            </Link>
                        </>
                    )}
                    {userAuth?.role?.roleName == 'Doctor' && (
                        <>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to='doctor-appointment'
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <EventAvailableIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="My Appointments" />
                                </ListItemButton>
                            </Link>

                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to='doctor-patient'
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonalInjuryIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="My Patients" />
                                </ListItemButton>
                            </Link>

                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to='doctor-prescription'
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ReceiptLongIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Prescriptions" />
                                </ListItemButton>
                            </Link>

                            {/* <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to='doctor-medical-records'
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <MedicalInformationIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Medical Records" />
                                </ListItemButton>
                            </Link> */}

                            {/* <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to='doctor-patient-history'
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ReceiptLongIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Patient History" />
                                </ListItemButton>
                            </Link> */}
                        </>
                    )}
                    {userAuth?.role?.roleName == 'Patient' && (
                        <>
                            <Link to='patient-book-appointment'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CalendarMonthIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Book Appointment" />
                                </ListItemButton>
                            </Link>

                            <Link to='patient-my-appointment'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HistoryIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="My Appointments" />
                                </ListItemButton>
                            </Link>

                            <Link to='patient-medical-records'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <MedicalInformationIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Medical Records" />
                                </ListItemButton>
                            </Link>

                            <Link to='patient-prescription'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <MedicalInformationIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Prescription" />
                                </ListItemButton>
                            </Link>

                            <Link to='patient-report'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AssessmentIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Reports" />
                                </ListItemButton>
                            </Link>

                            <Link to='patient-change-password'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ReceiptLongIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Change Password" />
                                </ListItemButton>
                            </Link>

                            <Link to='patient-profile'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonIcon sx={{ color: '#00A7B5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </ListItemButton>
                            </Link>
                        </>
                    )}

                    <Link
                        to='profile'
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon sx={{ color: '#00A7B5' }} />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </Link>
                </List>
            </Box>
        </>
    );
    return (
        <>
            <Box
                component="nav"
                sx={{
                    width: { md: drawerWidth },
                    flexShrink: { md: 0 },
                }}
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}
export default Sidebar;
