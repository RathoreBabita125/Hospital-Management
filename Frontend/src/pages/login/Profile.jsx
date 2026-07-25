import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import ChangePasswordModal from "./ChangePassword";
import EditProfileModal from "./EditProfile";

const Profile = () => {

    const { userAuth } = useContext(AuthContext);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    return (
        <Box sx={{ mt: 12, p: 3, minHeight: "100vh" }}>
            <Typography
                variant="h4"
                fontWeight={700}
                color="#00A7B5"
                mb={3}
                sx={{ mt: 5, color: '#00A7B5', fontWeight: 600 }}
            >
                My Profile
            </Typography>

            <Grid container spacing={3} sx={{ mt: 5 }}>
                {/* Left Card */}
                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            borderRadius: 4,
                            p: 4,
                            textAlign: "center",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                bgcolor: "#00A7B5",
                                fontSize: 45,
                                mx: "auto",
                                mb: 2,
                            }}
                        >
                            {userAuth?.userName[0]?.toUpperCase()}
                        </Avatar>

                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {userAuth.userName}
                        </Typography>

                        <Chip
                            label={userAuth.role.roleName}
                            sx={{ backgroundColor: "#e0f7fa", color: "#00A7B5" }}
                        />

                        <Divider sx={{ my: 3 }} />

                        <Stack spacing={2} alignItems="flex-start">
                            <Box display="flex" gap={2}>
                                <EmailIcon color="action" />
                                <Typography>{userAuth.email}</Typography>
                            </Box>

                            <Box display="flex" gap={2}>
                                <PhoneIcon color="action" />
                                <Typography>{userAuth.phone}</Typography>
                            </Box>

                            <Box display="flex" gap={2}>
                                <CalendarMonthIcon color="action" />
                                <Typography>Joined : {new Date(userAuth.createdAt).toLocaleDateString()}</Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={2} sx={{ mt: 7 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: "#00A7B5",
                                    textTransform: "none",
                                }}
                                onClick={() => setOpenEditModal(true)}
                            >
                                Edit Profile
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{
                                    textTransform: "none",
                                    borderColor: "#00A7B5",
                                    color: "#00A7B5",
                                }}
                                onClick={() => setOpenPasswordModal(true)}
                            >
                                Change Password
                            </Button>
                            <ChangePasswordModal
                                setOpenPasswordModal={setOpenPasswordModal}
                                openPasswordModal={openPasswordModal}
                            />
                            <EditProfileModal
                                openEditModal={openEditModal}
                                setOpenEditModal={setOpenEditModal}
                            />
                        </Stack>
                    </Paper>
                </Grid>

                {/* Right Card */}
                <Grid item xs={12} md={8}>
                    <Paper
                        elevation={3}
                        sx={{
                            borderRadius: 4,
                            p: 4,
                            width: 500
                        }}

                    >
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            mb={3}
                            sx={{ color: "#00A7B5", fontWeight: 600 }}
                        >
                            Personal Information
                        </Typography>

                        <Stack direction={'row'} sx={{ justifyContent: 'space-between', mt: 2 }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                                Full Name
                            </Typography>
                            <Typography fontWeight={600}>
                                {userAuth.userName}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                                Email
                            </Typography>
                            <Typography fontWeight={600}>
                                {userAuth.email}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                                Phone Number
                            </Typography>
                            <Typography fontWeight={600}>
                                {userAuth.phone}
                            </Typography>
                        </Stack>

                        <Divider sx={{ my: 4 }} />

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            mb={3}
                            sx={{ color: "#00A7B5", fontWeight: 600 }}
                        >
                            Account Information
                        </Typography>

                        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                                Role
                            </Typography>
                            <Typography fontWeight={600}>
                                {userAuth?.role.roleName}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                                Joined On
                            </Typography>
                            <Typography fontWeight={600}>
                                {new Date(userAuth?.createdAt).toLocaleDateString()}
                            </Typography>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Profile;