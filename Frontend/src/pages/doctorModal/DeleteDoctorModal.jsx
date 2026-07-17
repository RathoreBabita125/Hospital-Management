import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Button} from "@mui/material";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { DELETEDOCTOR } from "../../query/doctor/doctorQuery";

const DeleteDoctorModal = ({open, handleClose, selectedDoctor, setOpenDeleteDoctor}) => {
    const [deleteDoctor] = useMutation(DELETEDOCTOR, {
        refetchQueries:['getProjects']
    });
    const handleDeleteDoctor = async () => {
        try {
            const response = await deleteDoctor({
                variables: {
                    id: selectedDoctor.id
                }
            });
            if(response){
                toast.success("Doctor has been deleted successfully.");
                handleClose();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }  
    return (
        <Dialog
            open={open}
            onClose={(event, reason)=>{
                if(reason === "backdropClick" || reason === "escapeKeyDown"){
                    return;
                }
                handleClose()
            }} 
            fullWidth>
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{color:'#00A7B5', fontWeight:'bold'}}>Delete Project</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete this Doctor?</Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={()=>setOpenDeleteDoctor(false)} sx={{backgroundColor:'#00A7B5', color:'white'}}>Cancel</Button>
                    <Button onClick={handleDeleteDoctor} sx={{backgroundColor:'#00A7B5', color:'white'}}>Delete</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default DeleteDoctorModal;

