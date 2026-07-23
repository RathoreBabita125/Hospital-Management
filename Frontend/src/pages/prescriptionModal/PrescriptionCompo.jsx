import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    MenuItem, Stack, TextField, IconButton, Typography
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const PrescriptionCompo = ({
    title,
    actionName,
    open,
    handleClose,
    prescription,
    error,
    setPrescription,
    handleChange,
    handleOnBlur,
    handleActionPrescription,
    appointments,
}) => {

    const uniqueAppointments = Array.from(
        new Map(
            (appointments || []).map((appt) => [appt.user?.id, appt])
        ).values()
    );

    const handleAppointmentChange = (e) => {
        setPrescription({
            ...prescription,
            appointment: e.target.value,
        });
    };

    const handleMedicineChange = (index, value) => {
        const updated = [...prescription.medicine];
        updated[index] = value;
        setPrescription({ ...prescription, medicine: updated });
    };

    const addMedicineField = () => {
        setPrescription({
            ...prescription,
            medicine: [...prescription.medicine, ""],
        });
    };

    const removeMedicineField = (index) => {
        if (prescription.medicine.length === 1) return;
        setPrescription({
            ...prescription,
            medicine: prescription.medicine.filter((_, i) => i !== index),
        });
    };

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
                                select
                                fullWidth
                                label="Patient"
                                name="appointment"
                                value={prescription.appointment}
                                onChange={handleAppointmentChange}
                                error={error.appointment}
                                helperText={error.appointment ? error.appointment : ""}
                                onBlur={handleOnBlur}
                            >
                                {uniqueAppointments.map((appt) => (
                                    <MenuItem key={appt.id} value={appt.id}>
                                        {appt.user?.userName}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Box>
                                <Typography variant="subtitle2" sx={{ mb: 1, color: "#555" }}>
                                    Medicines
                                </Typography>
                                {prescription.medicine.map((med, index) => (
                                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                        <TextField
                                            fullWidth
                                            label={`Medicine ${index + 1}`}
                                            value={med}
                                            onChange={(e) => handleMedicineChange(index, e.target.value)}
                                        />
                                        <IconButton
                                            onClick={() => removeMedicineField(index)}
                                            disabled={prescription.medicine.length === 1}
                                        >
                                            <RemoveCircleIcon sx={{ color: "#e57373" }} />
                                        </IconButton>
                                        {index === prescription.medicine.length - 1 && (
                                            <IconButton onClick={addMedicineField}>
                                                <AddCircleIcon sx={{ color: "#00A7B5" }} />
                                            </IconButton>
                                        )}
                                    </Box>
                                ))}
                                {error.medicine && (
                                    <Typography color="error" variant="caption">
                                        {error.medicine}
                                    </Typography>
                                )}
                            </Box>

                            <TextField
                                fullWidth
                                label="Dosage"
                                name="dosage"
                                placeholder="e.g. 1 tablet twice a day"
                                value={prescription.dosage}
                                onChange={handleChange}
                                error={error.dosage}
                                helperText={error.dosage ? error.dosage : ""}
                                onBlur={handleOnBlur}
                            />

                            <TextField
                                fullWidth
                                label="Duration"
                                name="duration"
                                placeholder="e.g. 5 days"
                                value={prescription.duration}
                                onChange={handleChange}
                                error={error.duration}
                                helperText={error.duration ? error.duration : ""}
                                onBlur={handleOnBlur}
                            />

                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Instructions"
                                name="instructions"
                                placeholder="e.g. Take after meals"
                                value={prescription.instructions}
                                onChange={handleChange}
                                error={error.instructions}
                                helperText={error.instructions ? error.instructions : ""}
                                onBlur={handleOnBlur}
                            />
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
                            onClick={handleActionPrescription}
                        >
                            {actionName}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
export default PrescriptionCompo;