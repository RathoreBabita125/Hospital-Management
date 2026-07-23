import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Typography
} from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { toast } from 'react-toastify';
import { DELETEPRESCRIPTION, GETMYPRESCRIPTIONS } from "../../query/doctor/Prescription";

const DeletePrescriptionModal = ({ open, handleClose, prescription }) => {

    const [deletePrescription, { loading }] = useMutation(DELETEPRESCRIPTION, {
        refetchQueries: [GETMYPRESCRIPTIONS]
    });

    if (!prescription) return null;

    const handleDelete = async () => {
        try {
            await deletePrescription({
                variables: { id: prescription.id },
            });
            toast.success("Prescription deleted successfully.");
            handleClose();
        } catch (error) {
            toast.error(error.message || "Failed to delete prescription.");
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
            <Box sx={{ padding: 3 }}>
                <DialogTitle
                    sx={{
                        fontWeight: 600,
                        color: "#00A7B5",
                    }}
                >
                    Delete Prescription
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1">
                        Are you sure you want to delete the prescription for{" "}
                        <strong>{prescription?.appointment?.user?.userName || "this patient"}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={handleClose}
                        color="inherit"
                        sx={{ color: '#00A7B5' }}
                        variant="outlined"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{backgroundColor:'#00A7B5', color:'white'}}
                        onClick={handleDelete}
                        disabled={loading}  
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default DeletePrescriptionModal;