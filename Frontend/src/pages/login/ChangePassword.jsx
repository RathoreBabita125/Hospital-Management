import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Button,
    InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { validatePassword } from "../../validators/validatePassword";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { CHANGEPASSWORD } from "../../query/login/userQuery";

const ChangePasswordModal = ({ openPasswordModal, setOpenPasswordModal }) => {
    const [changePassword] = useMutation(CHANGEPASSWORD);
    const [passwordData, setPasswordData] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    // State to toggle password visibility
    const [showVisible, setShowVisible] = useState({
        password: false,
        newPassword:false,
        confirmPassword:false
    });

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleChangePassword = async () => {
        if (!validatePassword(passwordData, setErrors)) return;

        try {
            const response = await changePassword({
                variables: {
                    password: passwordData.password,
                    newPassword: passwordData.newPassword,
                    confirmPassword: passwordData.confirmPassword,
                },
            });

            toast.success("Password has been changed successfully.");
            console.log(response);
            setOpenPasswordModal(false);

            setPasswordData({
                password: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Dialog
                open={openPasswordModal}
                onClose={() => setOpenPasswordModal(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle
                    sx={{
                        color: "#00A7B5",
                        fontWeight: 700,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Change Password

                    <IconButton
                        onClick={() => setOpenPasswordModal(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Old Password"
                         type={showVisible.password ? "text" : "password"}
                        name="password"
                        value={passwordData.password}
                        onChange={handlePasswordChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, password: !pre.password }))}>
                                            {showVisible.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="New Password"
                        type={showVisible.newPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, newPassword: !pre.newPassword }))}>
                                            {showVisible.newPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm New Password"
                        type={showVisible. confirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, confirmPassword: !pre.confirmPassword }))}>
                                            {showVisible.confirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={() => setOpenPasswordModal(false)}
                        variant="outlined"
                        sx={{color:'#00A7B5'}}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleChangePassword}
                        sx={{
                            bgcolor: "#00A7B5",
                            textTransform: "none",
                            "&:hover": {
                                bgcolor: "#00838F",
                            },
                        }}
                    >
                        Update Password
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )
}
export default ChangePasswordModal;