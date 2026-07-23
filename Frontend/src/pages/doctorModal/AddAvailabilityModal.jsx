import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { ADDAVAILABILITY, GETMYAVAILABILITY } from "../../query/doctor/doctorAvailability";

const AddAvailabilityModal = ({ open, onClose, refetch }) => {
    const [addAvailability] = useMutation(ADDAVAILABILITY,{
        refetchQueries:[GETMYAVAILABILITY]
    });

    const [form, setForm] = useState({
        availableDate: "",
        fromTime: "",
        toTime: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleClose = () => {
        setForm({ availableDate: "", fromTime: "", toTime: "" });
        onClose();
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
            await addAvailability({ variables: form });
            toast.success("Availability added successfully.");
            await refetch();
            handleClose();
        } catch (error) {
            toast.error(error?.message || "Failed to add availability.");
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={(event, reason)=>{
                if(reason==='backdropClick' || reason==='escapeKeyDown'){
                    return;
                }
                handleClose();
            }} 
            fullWidth 
            maxWidth="xs"
        >
            <DialogTitle sx={{ color: "#00A7B5", fontWeight: 600 }}>Add Availability</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                    fullWidth
                    type="date"
                    label="Available Date"
                    name="availableDate"
                    value={form.availableDate}
                    onChange={handleChange}
                    sx={{mt:2}}
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
                <Button variant="outlined" sx={{ color: "#00A7B5" }} onClick={handleClose}>
                    Close
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "#00A7B5" }} onClick={handleSubmit}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddAvailabilityModal;