import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack, Box, Button } from "@mui/material";

const ViewDoctorModal = ({open, handleClose, selectedDoctor, setOpenViewDoctor}) => {
    if (!selectedDoctor) return null;

    console.log("Selected Doctor: ", selectedDoctor);
    
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
                <DialogTitle sx={{fontWeight:600, color:'#00A7B5', fontSize:25}}>Doctor Information</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <Typography><strong>Doctor Name :</strong> {selectedDoctor?.user?.userName}</Typography>
                        <Typography><strong>Department :</strong> {selectedDoctor?.department}</Typography>
                        <Typography><strong>Specialization :</strong> {selectedDoctor?.specialization}</Typography>
                        <Typography><strong>Available Date :</strong> {selectedDoctor?.availableDays}</Typography>
                        <Typography><strong>Consultation Fee :</strong> {selectedDoctor?.consultationFee}</Typography>
                        <Typography><strong>Status :</strong> {selectedDoctor?.status && "Active"}</Typography>
                        <Typography><strong>Email :</strong> {selectedDoctor?.user?.email}</Typography>
                        <Typography><strong>Contact :</strong> {selectedDoctor?.user?.phone}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={()=>setOpenViewDoctor(false)}
                        sx={{backgroundColor:'#00A7B5', color:'white'}}
                    >Close</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default ViewDoctorModal;
