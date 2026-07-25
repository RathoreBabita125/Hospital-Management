import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { inputHandler } from "../../common/inputHandler";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { GETME, UPDATEPROFILE } from "../../query/login/userQuery";
import { genders, bloodGroups } from "../../constants/const";

const EditProfileModal = ({ openEditModal, setOpenEditModal }) => {

    const { userAuth } = useContext(AuthContext);
    const roleName = userAuth?.role?.roleName;

    const [updateProfile] = useMutation(UPDATEPROFILE, {
        refetchQueries: [GETME]
    });

    const [editProfile, setEditProfile] = useState({
        userName: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        height: "",
        weight: "",
        age: "",
        about: "",
    });

    // Modal khulte hi current userAuth data se form prefill karo
    useEffect(() => {
        if (openEditModal && userAuth) {
            setEditProfile({
                userName: userAuth.userName || "",
                email: userAuth.email || "",
                phone: userAuth.phone || "",
                address: userAuth.patient?.address || userAuth.doctor?.address || "",
                dateOfBirth: (userAuth.patient?.dateOfBirth || userAuth.doctor?.dateOfBirth || "").slice?.(0, 10) || "",
                gender: userAuth.patient?.gender || userAuth.doctor?.gender || "",
                bloodGroup: userAuth.patient?.bloodGroup || "",
                height: userAuth.patient?.height || "",
                weight: userAuth.patient?.weight || "",
                age: userAuth.patient?.age || "",
                about: userAuth.doctor?.about || "",
            });
        }
    }, [openEditModal, userAuth]);

    const handleChange = (event) => {
        inputHandler(event, editProfile, setEditProfile)
    }

    const handleUpdateProfile = async () => {
        
        if (!editProfile.userName || !editProfile.email || !editProfile.phone) {
            toast.error("Name, email, and phone are required.");
            return;
        }

        try {
            const variables = {
                userName: editProfile.userName,
                email: editProfile.email,
                phone: editProfile.phone,
                address: editProfile.address,
                dateOfBirth: editProfile.dateOfBirth,
                gender: editProfile.gender,
            };

            if (roleName === "Patient") {
                variables.bloodGroup = editProfile.bloodGroup;
                variables.height = editProfile.height ? Number(editProfile.height) : undefined;
                variables.weight = editProfile.weight ? Number(editProfile.weight) : undefined;
                variables.age = editProfile.age ? Number(editProfile.age) : undefined;
            }

            if (roleName === "Doctor") {
                variables.about = editProfile.about;
            }

            const { data } = await updateProfile({ variables });

            toast.success(data.updateProfile.message);
            setOpenEditModal(false);
        } catch (error) {
            toast.error(error?.message || "Failed to update profile.");
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

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Address"
                        name="address"
                        multiline
                        rows={2}
                        value={editProfile.address}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        type="date"
                        label="Date of Birth"
                        name="dateOfBirth"
                        value={editProfile.dateOfBirth}
                        onChange={handleChange}
                        slotProps={{
                            inputLabel:{
                                shrink:true
                            }
                        }}
                    />

                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Gender"
                        name="gender"
                        value={editProfile.gender}
                        onChange={handleChange}
                    >
                        {genders.map((g) => (
                            <MenuItem key={g} value={g}>{g}</MenuItem>
                        ))}
                    </TextField>

                    {/* Patient-only fields */}
                    {roleName === "Patient" && (
                        <>
                            <TextField
                                select
                                fullWidth
                                margin="normal"
                                label="Blood Group"
                                name="bloodGroup"
                                value={editProfile.bloodGroup}
                                onChange={handleChange}
                            >
                                {bloodGroups.map((bg) => (
                                    <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                margin="normal"
                                type="number"
                                label="Age"
                                name="age"
                                value={editProfile.age}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                type="number"
                                label="Height (cm)"
                                name="height"
                                value={editProfile.height}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                type="number"
                                label="Weight (kg)"
                                name="weight"
                                value={editProfile.weight}
                                onChange={handleChange}
                            />
                        </>
                    )}

                    {/* Doctor-only fields */}
                    {roleName === "Doctor" && (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="About / Summary"
                            name="about"
                            multiline
                            rows={3}
                            value={editProfile.about}
                            onChange={handleChange}
                        />
                    )}

                </DialogContent>

                <DialogActions sx={{ p: 2 }}>

                    <Button
                        onClick={() => setOpenEditModal(false)}
                        variant="outlined"
                        sx={{ color: '#00A7B5' }}
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