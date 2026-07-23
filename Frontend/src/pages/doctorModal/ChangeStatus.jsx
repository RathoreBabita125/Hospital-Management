import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem, Button, Typography,
    Box
} from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { GETAPPOINTMENTS, UPDATEAPPOINTMENTSTATUS } from "../../query/patient/appointmentQuery";
import { STATUS_TRANSITIONS } from "../../constants/const";

const ChangeStatusModal = ({ open, onClose, appointment }) => {

    const [newStatus, setNewStatus] = useState("");
    const [error, setError] = useState("");
    
    const [updateAppointmentStatus, { loading }] = useMutation(UPDATEAPPOINTMENTSTATUS, {
        refetchQueries: [GETAPPOINTMENTS]
    });

    useEffect(() => {
        setNewStatus("");
        setError("");
    }, [appointment, open]);

    if (!appointment) return null;

    const currentStatus = appointment.status;
    const allowedNext = STATUS_TRANSITIONS[currentStatus] || [];

    const handleSubmit = async () => {
        if (!newStatus) {
            setError("Please select a status to update to.");
            return;
        }
        try {
            await updateAppointmentStatus({
                variables: {
                    id: appointment.id,
                    status: newStatus
                },
            });
            onClose();
            toast.success("Status has been updated successfully.");
        } catch (err) {
            setError(err.message || "Failed to update status.");
            toast.error(err.message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{ color: "#00A7B5", fontWeight: 600 }}>
                    Change Appointment Status
                </DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Patient (Appointment)"
                        value={appointment.user?.userName || ""}
                        disabled
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Current Status"
                        value={currentStatus}
                        disabled
                        fullWidth
                    />
                    <TextField
                        select
                        label="Update Status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        fullWidth
                        disabled={allowedNext.length === 0}
                        error={!!error}
                        helperText={
                            allowedNext.length === 0
                                ? `No further status changes allowed from "${currentStatus}".`
                                : "Select the new status"
                        }
                    >
                        {allowedNext.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>
                    {error && <Typography color="error" variant="body2">{error}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant="outlined" sx={{ color: '#00A7B5' }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#00A7B5" }}
                        onClick={handleSubmit}
                        disabled={loading || allowedNext.length === 0}
                    >
                        {loading ? "Updating..." : "Update Status"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default ChangeStatusModal;