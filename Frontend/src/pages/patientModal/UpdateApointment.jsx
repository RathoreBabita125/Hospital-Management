import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from '@apollo/client/react';
import { GETDOCTORS } from '../../query/doctor/doctorQuery'
import LoadingCompo from "../../common/Loading";
import { GETAPPOINTMENTS, RESCHEDULEAPPOINTMENT } from "../../query/patient/appointmentQuery";
import {toast} from 'react-toastify';

const UpdateAppointmentModal = ({ open, selectedAppointment, setOpenEditAppoint, handleClose }) => {

    const [newDate, setNewDate] = useState("");
    const [newTimeSlot, setNewTimeSlot] = useState("");

    const [rescheduleAppointment] = useMutation(RESCHEDULEAPPOINTMENT,{
        refetchQueries:[GETAPPOINTMENTS]
    });
    
    const { data: doctorData, doctorLoading } = useQuery(GETDOCTORS, {
        variables: {
            department: selectedAppointment?.department
        },
        skip: !selectedAppointment,
    });

    if (doctorLoading) return <LoadingCompo />;

    const formatTime = (time) => {
        if (!time) return "";
        const [hour, minute] = time.split(":");
        const date = new Date();
        date.setHours(Number(hour), Number(minute));
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    const doctorForAppointment = doctorData?.getDoctors?.find(
        (doctor) => doctor.id === selectedAppointment?.doctor?.id
    );

    const availableSlots = doctorForAppointment?.availability?.filter((slot) => !slot.isBooked) || [];

    const uniqueDates = [
        ...new Map(availableSlots.map((slot) => [slot.availableDate, slot])).values(),
    ];

    const slotsForSelectedDate = availableSlots.filter((slot) => slot.availableDate === newDate);

    const handleUpdateAppointment = async () => {
    
        if (!newDate || !newTimeSlot) {
            toast.error("Please select date and time slot.");
            return;
        }
        try {
            await rescheduleAppointment({
                variables: {
                    id: selectedAppointment.id,
                    availableDate: newDate,
                    timeSlot: newTimeSlot,
                },
            });
            toast.success("Appointment rescheduled successfully.");
            setOpenEditAppoint(false);
        } catch (error) {
            toast.error(error?.message || "Failed to reschedule appointment.");
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <Box sx={{padding:3}}>
                    <DialogTitle sx={{ color: "#00A7B5", fontWeight: 600 }}>Edit Appointment</DialogTitle>
                    <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, }}>
                        <TextField
                            label="Doctor"
                            value={selectedAppointment?.doctor?.user?.userName || ""}
                            disabled
                            fullWidth
                            sx={{mt:2}}
                        />

                        <TextField
                            select
                            fullWidth
                            label="Available Date"
                            value={newDate}
                            onChange={(e) => { setNewDate(e.target.value); setNewTimeSlot(""); }}
                        >
                            {uniqueDates.length ? (
                                uniqueDates.map((slot) => (
                                    <MenuItem key={slot.availableDate} value={slot.availableDate}>
                                        {new Date(slot.availableDate).toLocaleDateString("en-GB", {
                                            day: "2-digit", month: "long", year: "numeric",
                                        })}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No Dates Available</MenuItem>
                            )}
                        </TextField>

                        <TextField
                            select
                            fullWidth
                            label="Time Slot"
                            value={newTimeSlot}
                            onChange={(e) => setNewTimeSlot(e.target.value)}
                            disabled={!newDate}
                        >
                            {slotsForSelectedDate.length ? (
                                slotsForSelectedDate.map((slot) => {
                                    const label = `${formatTime(slot.fromTime)} - ${formatTime(slot.toTime)}`;
                                    return <MenuItem key={slot.id} value={label}>{label}</MenuItem>;
                                })
                            ) : (
                                <MenuItem disabled>No Slots Available</MenuItem>
                            )}
                        </TextField>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button 
                            variant="outlined"
                            sx={{color:'#00A7B5'}}
                            onClick={()=>setOpenEditAppoint(false)}>
                                Close
                        </Button>
                        <Button 
                            sx={{backgroundColor:'#00A7B5', color:'white'}}
                            onClick={handleUpdateAppointment}
                        >Update Appointment</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
export default UpdateAppointmentModal;