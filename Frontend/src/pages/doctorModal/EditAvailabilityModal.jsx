import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { GETMYAVAILABILITY, UPDATEAVAILABILITY } from "../../query/doctor/doctorAvailability";

const EditAvailabilityModal = ({ open, onClose, selectedAvailability, refetch }) => {
    const [updateAvailability] = useMutation(UPDATEAVAILABILITY,{
        refetchQueries:[GETMYAVAILABILITY]
    });

    const [form, setForm] = useState({
        availableDate: "",
        fromTime: "",
        toTime: "",
    });

    useEffect(() => {
        if (selectedAvailability) {
            setForm({
                availableDate: selectedAvailability.availableDate?.slice(0, 10) || "",
                fromTime: selectedAvailability.fromTime || "",
                toTime: selectedAvailability.toTime || "",
            });
        }
    }, [selectedAvailability]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.availableDate || !form.fromTime || !form.toTime) {
            toast.error("Please fill all fields.");
            return;
        }
        if (form.fromTime >= form.toTime) {
            toast.error("From Time must be earlier than To Time.");
            return;
        }

        try {
            await updateAvailability({
                variables: {
                    id: selectedAvailability.id,
                    ...form,
                },
            });
            toast.success("Availability updated successfully.");
            await refetch();
            onClose();
        } catch (error) {
            toast.error(error?.message || "Failed to update availability.");
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={(event, reason)=>{
                if(reason==='backdropClick' || reason==='escapeKeyDown'){
                    return;
                }
                onClose();
            }} 
            fullWidth 
            maxWidth="xs">
            <Box sx={{padding:1}}>
                <DialogTitle sx={{ color: "#00A7B5", fontWeight: 600 }}>Edit Availability</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Available Date"
                        name="availableDate"
                        value={form.availableDate}
                        onChange={handleChange}
                        sx={{mt:1}}
                        slotProps={
                            {
                                inputLabel:{
                                    shrink:true
                                }
                            }
                        }
                    />
                    <TextField
                        fullWidth
                        type="time"
                        label="From Time"
                        name="fromTime"
                        value={form.fromTime}
                        onChange={handleChange}
                        slotProps={
                            {
                                inputLabel:{
                                    shrink:true
                                }
                            }
                        }
                    />
                    <TextField
                        fullWidth
                        type="time"
                        label="To Time"
                        name="toTime"
                        value={form.toTime}
                        onChange={handleChange}
                        slotProps={
                            {
                                inputLabel:{
                                    shrink:true
                                }
                            }
                        }
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button variant="outlined" sx={{ color: "#00A7B5" }} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: "#00A7B5" }} onClick={handleSubmit}>
                        Update
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default EditAvailabilityModal;