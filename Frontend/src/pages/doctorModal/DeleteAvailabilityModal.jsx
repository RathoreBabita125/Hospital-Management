import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { DELETEAVAILABILITY, GETMYAVAILABILITY } from "../../query/doctor/doctorAvailability";

const DeleteAvailabilityModal = ({ open, onClose, selectedAvailability, refetch }) => {

    const [deleteAvailability] = useMutation(DELETEAVAILABILITY,{
        refetchQueries:[GETMYAVAILABILITY]
    });

    const handleConfirmDelete = async () => {
        try {
            await deleteAvailability({
                variables: { id: selectedAvailability.id },
            });
            toast.success("Availability deleted successfully.");
            await refetch();
            onClose();
        } catch (error) {
            toast.error(error?.message || "Failed to delete availability.");
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
            maxWidth="xs" 
            fullWidth
        >
            <Box sx={{padding:1}}>
                <DialogTitle sx={{ fontWeight: 600, color:'#00A7B5', fontSize:20}}>Delete Availability</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this availability slot?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button variant="outlined" sx={{ color: '#00A7B5' }} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="contained" sx={{backgroundColor:'#00A7B5'}} onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default DeleteAvailabilityModal;