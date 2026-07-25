import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { allDepartments, specializations, } from "../../constants/const";

const DoctorFormCompo = ({
    title,
    actionName,
    open,
    handleClose,
    doctor,
    error,
    setDoctor,
    handleChange,
    handleOnBlur,
    handleActionDoctor,
}) => {
    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (
                    reason === "escapeKeyDown" ||
                    reason === "backdropClick"
                ) {
                    return;
                }
                handleClose();
            }}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    width: "700px",
                    maxWidth: "70%",
                    height: "65vh",
                    borderRadius: 3,
                    overflow: "hidden",
                },
            }}
            sx={{ marginTop: 8 }}
        >
            <Box sx={{ padding: 0.5 }}>
                <DialogTitle
                    sx={{
                        color: "#00A7B5",
                        fontWeight: 700,
                        fontSize: 28,
                        py: 2,
                    }}
                >
                    {title}
                </DialogTitle>

                <DialogContent
                    dividers
                    sx={{
                        overflowY: "auto",
                        py: 2,
                    }}
                >
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            required
                            label="Doctor Name"
                            name="userName"
                            value={doctor.userName}
                            onChange={handleChange}
                            onBlur={handleOnBlur}
                            error={!!error.userName}
                            helperText={error.userName}
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                fullWidth
                                required
                                label="Email"
                                name="email"
                                value={doctor.email}
                                onChange={handleChange}
                                onBlur={handleOnBlur}
                                error={!!error.email}
                                helperText={error.email}
                            />

                            <TextField
                                fullWidth
                                required
                                label="Phone"
                                name="phone"
                                value={doctor.phone}
                                onChange={handleChange}
                                onBlur={handleOnBlur}
                                error={!!error.phone}
                                helperText={error.phone}
                            />
                        </Stack>

                        <TextField
                            fullWidth
                            required
                            type="password"
                            label="Password"
                            name="password"
                            value={doctor.password}
                            onChange={handleChange}
                            onBlur={handleOnBlur}
                            error={!!error.password}
                            helperText={error.password}
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                select
                                fullWidth
                                required
                                label="Department"
                                name="department"
                                value={doctor.department}
                                onChange={handleChange}
                                onBlur={handleOnBlur}
                                error={!!error.department}
                                helperText={error.department}
                            >
                                {allDepartments.map((department) => (
                                    <MenuItem key={department} value={department}>
                                        {department}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                fullWidth
                                required
                                label="Specialization"
                                name="specialization"
                                value={doctor.specialization}
                                onChange={handleChange}
                                onBlur={handleOnBlur}
                                error={!!error.specialization}
                                helperText={error.specialization}
                            >
                                {specializations.map((specialization) => (
                                    <MenuItem key={specialization} value={specialization}>
                                        {specialization}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>

                        <TextField
                            fullWidth
                            required
                            label="Qualification"
                            name="qualification"
                            value={doctor.qualification}
                            onChange={handleChange}
                            onBlur={handleOnBlur}
                            error={!!error.qualification}
                            helperText={error.qualification}
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                fullWidth
                                required
                                type="number"
                                label="Experience (Years)"
                                name="experience"
                                value={doctor.experience}
                                onChange={handleChange}
                                onBlur={handleOnBlur}
                                error={!!error.experience}
                                helperText={error.experience}
                            />

                            <TextField
                                fullWidth
                                required
                                type="number"
                                label="Consultation Fee"
                                name="consultationFee"
                                value={doctor.consultationFee}
                                onChange={handleChange}
                                onBlur={handleOnBlur}
                                error={!!error.consultationFee}
                                helperText={error.consultationFee}
                            />
                        </Stack>

                        <TextField
                            fullWidth
                            required
                            multiline
                            rows={2}
                            label="Address"
                            name="address"
                            value={doctor.address}
                            onChange={handleChange}
                            onBlur={handleOnBlur}
                            error={!!error.address}
                            helperText={error.address}
                        />

                        <TextField
                            select
                            fullWidth
                            required
                            label="Status"
                            name="status"
                            value={doctor.status ? "true" : "false"}
                            onChange={(e) =>
                                setDoctor({
                                    ...doctor,
                                    status: e.target.value === "true",
                                })
                            }
                        >
                            <MenuItem value="true">Active</MenuItem>
                            <MenuItem value="false">Inactive</MenuItem>
                        </TextField>

                        <Box sx={{ mt: 1 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{ mb: 1, fontWeight: 600, color: "#00A7B5" }}
                            >
                                Doctor Image <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    
                                    const file = e.target.files[0];

                                    if (file.size > 2 * 1024 * 1024) {
                                        alert("Image size should be less than 2MB");
                                        return;
                                    }
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setDoctor({
                                            ...doctor,
                                            image: reader.result,
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                }}
                                style={{
                                    width: "95%",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            />
                            {doctor.image && (
                                <Typography
                                    variant="body2"
                                    sx={{ mt: 1, color: "#00A7B5" }}
                                >
                                    Image selected successfully
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 3,
                        py: 2,
                        borderTop: "1px solid #e0e0e0",
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        sx={{
                            color: "#00A7B5",
                            borderColor: "#00A7B5",
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleActionDoctor}
                        sx={{
                            bgcolor: "#00A7B5",
                            "&:hover": {
                                bgcolor: "#00838F",
                            },
                        }}
                    >
                        {actionName}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default DoctorFormCompo;