import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { CHANGEDOCTORSTATUS, GETDOCTORS } from "../../query/doctor/doctorQuery";
import { toast } from "react-toastify";

const ChangeDoctorStatusModal = ({ open, onClose, selectedDoctor, refetch }) => {

    const [changeDoctorStatus] = useMutation(CHANGEDOCTORSTATUS,{
        refetchQueries:[GETDOCTORS]
    });

    const isActive = selectedDoctor?.status;

    console.log("doctor status: ", isActive);
    

    const handleConfirm = async () => {
        try {
            await changeDoctorStatus({
                variables: { 
                    id: selectedDoctor.id ,
                    status:!isActive
                },
            });
            toast.success(`Doctor ${isActive ? "deactivated" : "activated"} successfully.`);
            await refetch();
            onClose();
        } catch (error) {
            toast.error(error?.message || "Failed to change doctor status.");
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
                <DialogTitle sx={{ fontWeight: 600, color: '#00A7B5'}}> 
                    {isActive ? "Deactivate Doctor" : "Activate Doctor"}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to {isActive ? "deactivate" : "activate"}{" "}
                        <b>{selectedDoctor?.user?.userName}</b>?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button variant="outlined" sx={{ color: '#00A7B5' }} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        sx={{backgroundColor:'#00A7B5'}}
                        onClick={handleConfirm}
                    >
                        {isActive ? "Deactivate" : "Activate"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default ChangeDoctorStatusModal;