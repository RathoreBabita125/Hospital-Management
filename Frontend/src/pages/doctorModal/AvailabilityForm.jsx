import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { timeSlotDuration } from "../../constants/const";

const AvailabilityFormModal = ({ open, onClose, title, actionName, form, setForm, handleSubmit, }) => {

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "slotDuration"
                ? Number(value)
                : value
        }));
    };

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
                onClose();
            }}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle sx={{ color: "#00A7B5", fontWeight: 600 }}>{title}</DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 1
                }}
            >
                <TextField
                    fullWidth
                    type="date"
                    label="Available Date"
                    name="availableDate"
                    value={form.availableDate}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />
                <TextField
                    fullWidth
                    type="time"
                    label="From Time"
                    name="fromTime"
                    value={form.fromTime}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />
                <TextField
                    fullWidth
                    type="time"
                    label="To Time"
                    name="toTime"
                    value={form.toTime}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />
                <TextField
                    select
                    fullWidth
                    label="Slot Duration"
                    name="slotDuration"
                    value={form.slotDuration}
                    onChange={handleChange}
                >
                    {
                        timeSlotDuration.map((duration) => {
                           return <MenuItem value={duration} key={duration}>{duration} Minutes</MenuItem>
                        })
                    }
                </TextField>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button
                    variant="outlined"
                    sx={{ color: "#00A7B5" }}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#00A7B5",
                        "&:hover": {
                            backgroundColor: "#00838F"
                        }
                    }}
                    onClick={handleSubmit}
                >
                    {actionName}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AvailabilityFormModal;