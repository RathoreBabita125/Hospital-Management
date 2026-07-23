import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack, Box, Button } from "@mui/material";

const ViewPatientModal = ({open, handleClose, selectedPatient, setOpenViewPatient}) => {
    
    if (!selectedPatient) return null;    
    
    return (
        <Dialog
            open={open}
            onClose={(event, reason)=>{
                if(reason === "backdropClick" || reason === "escapeKeyDown"){
                    return;
                }
                handleClose()
            }} 
            fullWidth    
        >
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{fontWeight:600, color:'#00A7B5', fontSize:25}}>Patient Information</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <Typography><strong>Patient Name :</strong> {selectedPatient?.user?.userName}</Typography>
                        <Typography><strong>Gender :</strong> {selectedPatient?.user?.patient?.gender}</Typography>
                        <Typography><strong>Age :</strong> {selectedPatient?.user?.patient?.age}</Typography>
                        <Typography><strong>Blood Group :</strong> {selectedPatient?.user?.patient?.bloodGroup}</Typography>
                        <Typography><strong>Status :</strong> {selectedPatient?.status && "Active"}</Typography>
                        <Typography><strong>Email :</strong> {selectedPatient?.user?.email}</Typography>
                        <Typography><strong>Contact :</strong> {selectedPatient?.user?.phone}</Typography>
                        <Typography><strong>Emergency Number :</strong> {selectedPatient?.user?.patient?.emergencyNumber}</Typography>
                        <Typography><strong>Address :</strong> {selectedPatient?.user?.patient?.address}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={()=>setOpenViewPatient(false)}
                        sx={{backgroundColor:'#00A7B5', color:'white'}}
                    >Close</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default ViewPatientModal;
