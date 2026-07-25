import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { CANCELAPPOINTMENT, GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import { toast } from "react-toastify";

const CancelAppointmentModal = ({ open, selectedAppointment, setOpenCancelAppoint }) => {

    const [cancelAppointment] = useMutation(CANCELAPPOINTMENT,{
        refetchQueries:[GETAPPOINTMENTS]
    });

    const handleClose = () => setOpenCancelAppoint(false);

    const handleConfirmCancel = async () => {
        try {
            await cancelAppointment({
                variables: { id: selectedAppointment.id },
            });
            toast.success("Appointment cancelled successfully.");
            setOpenCancelAppoint(false);
        } catch (error) {
            toast.error(error?.message || "Failed to cancel appointment.");
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
            maxWidth="xs" 
            fullWidth
        >
            <Box sx={{padding:1}}>
                <DialogTitle sx={{ fontWeight: 700, fontSize:22, color:'#00A7B5'}}>Cancel Appointment</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to cancel this appointment?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button variant="outlined" sx={{ color: '#00A7B5' }} onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="contained" onClick={handleConfirmCancel} sx={{backgroundColor:' #00A7B5', color:'white'}}>
                        Cancel
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default CancelAppointmentModal;