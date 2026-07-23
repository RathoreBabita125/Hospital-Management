import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";
import { allDepartments, specializations } from "../../constants/const";

const DoctorFormCompo = ({ title, actionName, open, handleClose, doctor, error, setDoctor, handleChange, handleOnBlur, handleActionDoctor }) => {

    return (
        <>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
                        return;
                    }
                    handleClose();
                }}
                fullWidth
                maxWidth="sm"

            >
                <Box sx={{ padding: 3 }}>
                    <DialogTitle
                        sx={{
                            fontWeight: 600,
                            color: "#00A7B5",
                        }}
                    >
                        {title}
                    </DialogTitle>
                    <DialogContent dividers>

                        <Stack direction={'column'} spacing={2}>
                            <TextField
                                fullWidth
                                label="Doctor Name"
                                name="userName"
                                value={doctor.userName}
                                onChange={handleChange}
                                error={error.userName}
                                helperText={error.userName ? error.userName : ""}
                                onBlur={handleOnBlur}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={doctor.email}
                                onChange={handleChange}
                                error={error.email}
                                helperText={error.email ? error.email : ""}
                                onBlur={handleOnBlur}
                            />
                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                name="password"
                                value={doctor.password}
                                onChange={handleChange}
                                error={error.password}
                                helperText={error.password ? error.password : ""}
                                onBlur={handleOnBlur}
                            />
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={doctor.phone}
                                onChange={handleChange}
                                error={error.phone}
                                helperText={error.phone ? error.phone : ""}
                                onBlur={handleOnBlur}
                            />
                            <TextField
                                select
                                fullWidth
                                label="Department"
                                name="department"
                                value={doctor.department}
                                onChange={handleChange}
                                error={error.department}
                                helperText={error.department ? error.department : ""}
                                onBlur={handleOnBlur}
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
                                label="Specialization"
                                name="specialization"
                                value={doctor.specialization}
                                onChange={handleChange}
                                error={error.specialization}
                                helperText={error.specialization ? error.specialization : ""}
                                onBlur={handleOnBlur}
                            >
                                {specializations.map((specialization) => (
                                    <MenuItem key={specialization} value={specialization}>
                                        {specialization}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                type="number"
                                label="Experience (Years)"
                                name="experience"
                                value={doctor.experience}
                                onChange={handleChange}
                                error={error.experience}
                                helperText={error.experience ? error.experience : ""}
                                onBlur={handleOnBlur}
                            />
                            <TextField
                                fullWidth
                                type="number"
                                label="Consultation Fee"
                                name="consultationFee"
                                value={doctor.consultationFee}
                                onChange={handleChange}
                                error={error.consultationFee}
                                helperText={error.consultationFee ? error.consultationFee : ""}
                                onBlur={handleOnBlur}
                            />
                            {/* <TextField
                                fullWidth
                                type="date"
                                name="availableDate"
                                label="Available Date"
                                value={doctor.availableDate}
                                onChange={handleChange}
                                error={error.availableDate}
                                helperText={error.availableDate ? error.availableDate : ""}
                                onBlur={handleOnBlur}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            /> */}
                            {/* <TextField
                                select
                                fullWidth
                                label="Status"
                                name="status"
                                value={doctor.status}
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        status: e.target.value === "true",
                                    })
                                }
                            >
                                <MenuItem value="true">Active</MenuItem>
                                <MenuItem value="false">Inactive</MenuItem>
                            </TextField> */}

                            <TextField
                                fullWidth
                                type="date"
                                name="availableDate"
                                label="Available Date"
                                value={doctor.availableDate}
                                onChange={handleChange}
                                error={error.availableDate}
                                helperText={error.availableDate ? error.availableDate : ""}
                                onBlur={handleOnBlur}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    fullWidth
                                    type="time"
                                    name="fromTime"
                                    label="Time Slot From"
                                    value={doctor.fromTime}
                                    onChange={handleChange}
                                    error={error.fromTime}
                                    helperText={error.fromTime ? error.fromTime : ""}
                                    onBlur={handleOnBlur}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    type="time"
                                    name="toTime"
                                    label="Time Slot To"
                                    value={doctor.toTime}
                                    onChange={handleChange}
                                    error={error.toTime}
                                    helperText={error.toTime ? error.toTime : ""}
                                    onBlur={handleOnBlur}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            </Stack>

                            <TextField
                                select
                                fullWidth
                                label="Status"
                                name="status"
                                value={doctor.status}
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
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button
                            onClick={handleClose}
                            color="inherit"
                            sx={{ color: '#00A7B5' }}
                            variant="outlined"
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#00A7B5",
                                "&:hover": {
                                    bgcolor: "#00838F",
                                },
                            }}
                            onClick={handleActionDoctor}
                        >
                            {actionName}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
export default DoctorFormCompo;