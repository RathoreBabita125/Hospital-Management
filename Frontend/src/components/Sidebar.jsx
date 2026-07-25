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
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingCompo from "../common/Loading";
import { NavLink } from 'react-router-dom';
import { showActiveStyle } from "../constants/const";

const Sidebar = ({ mobileOpen, setMobileOpen, drawerWidth }) => {

    const { userAuth, loading } = useContext(AuthContext);
    if (loading) return <LoadingCompo />

    const drawer = (
        <>
            <Box sx={{ width: 300 }}>
                <Toolbar sx={{ height: 100 }}>
                    <Typography variant="h4" color="initial" sx={{ fontWeight: 700, color: '#00A7B5' }}>HopeCare</Typography>
                </Toolbar>
                <Divider />
                <List sx={{ mt: 5 }}>
                    <NavLink
                        to="/dashboard"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        {({ isActive }) => (
                            <ListItemButton
                                selected={isActive}
                                sx={showActiveStyle}
                            >
                                <ListItemIcon>
                                    <DashboardIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        )}
                    </NavLink>

                    {userAuth?.role?.roleName == 'Admin' && (
                        <>
                            <NavLink
                                to='/admin-doctors'
                                style={{ textDecoration: "none", color: "inherit", }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <MedicalServicesIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Doctor Management" />
                                    </ListItemButton>
                                )}
                            </NavLink>

                            <NavLink to='/admin-patients'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <PersonalInjuryIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Patient Management" />
                                    </ListItemButton>
                                )}
                            </NavLink>

                            <NavLink to='/admin-appointments'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <EventAvailableIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Appointment Management" />
                                    </ListItemButton>
                                )}
                            </NavLink>

                            <NavLink to='/admin-reports'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <AssessmentIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Reports" />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        </>
                    )}
                    {userAuth?.role?.roleName == 'Doctor' && (
                        <>
                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to='doctor-appointment'
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <EventAvailableIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="My Appointments" />
                                    </ListItemButton>
                                )}
                            </NavLink>

                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to='my-availability'
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <EventAvailableIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="My Availability" />
                                    </ListItemButton>
                                )}
                            </NavLink>
                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to='doctor-prescription'
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <ReceiptLongIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Prescriptions" />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        </>
                    )}
                    {userAuth?.role?.roleName == 'Patient' && (
                        <>
                            <NavLink to='doctors-list'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <MedicalServicesIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Doctors List" />
                                    </ListItemButton>
                                )}
                            </NavLink>
                            <NavLink to='patient-book-appointment'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <CalendarMonthIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Book Appointment" />
                                    </ListItemButton>
                                )}
                            </NavLink>
                            <NavLink to='patient-my-appointment'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <HistoryIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="My Appointments" />
                                    </ListItemButton>
                                )}
                            </NavLink>
                            <NavLink to='patient-prescription'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton
                                        selected={isActive}
                                        sx={showActiveStyle}
                                    >
                                        <ListItemIcon>
                                            <MedicalInformationIcon sx={{ color: !isActive ? '#00A7B5' : "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Prescription" />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        </>
                    )}

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
