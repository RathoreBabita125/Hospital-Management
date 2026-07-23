import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { inputHandler } from "../../common/inputHandler";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { GETME, UPDATEPROFILE } from "../../query/login/userQuery";

const EditProfileModal = ({ openEditModal, setOpenEditModal }) => {

    const { userAuth } = useContext(AuthContext);

    const [updateProfile] = useMutation(UPDATEPROFILE,{
        refetchQueries:[GETME]
    });
    
    const [editProfile, setEditProfile] = useState({
        userName: userAuth?.userName || "",
        email: userAuth?.email || "",
        phone: userAuth?.phone || "",
    });

    const handleChange = (event) => {
        inputHandler(event, editProfile, setEditProfile)
    }

    const handleUpdateProfile = async () => {
        try {
            const { data } = await updateProfile({
                variables: {
                    id: userAuth.id,
                    userName: editProfile.userName,
                    email: editProfile.email,
                    password: editProfile.password,
                    phone: editProfile.phone,
                },
            });

            toast.success(data.updateProfile.message);
            setOpenEditModal(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Dialog
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    sx={{
                        color: "#00A7B5",
                        fontWeight: 700,
                    }}
                >
                    Edit Profile
                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        name="userName"
                        value={editProfile.userName}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        value={editProfile.email}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Phone Number"
                        name="phone"
                        value={editProfile.phone}
                        onChange={handleChange}
                    />

                </DialogContent>

                <DialogActions sx={{ p: 2 }}>

                    <Button
                        onClick={() => setOpenEditModal(false)}
                        variant="outlined"
                        sx={{color:'#00A7B5'}}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#00A7B5",
                            textTransform: "none",
                            "&:hover": {
                                bgcolor: "#00838F",
                            },
                        }}
                        onClick={handleUpdateProfile}
                    >
                        Save Changes
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )
}
export default EditProfileModal