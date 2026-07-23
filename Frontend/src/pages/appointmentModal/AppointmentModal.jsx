import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack, Box, Button, Divider } from "@mui/material";

const ViewAppointmentModal = ({open, handleClose, selectAppointment, setOpenViewAppointment}) => {
    
    if (!selectAppointment) return null;

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
                <DialogTitle sx={{fontWeight:600, color:'#00A7B5', fontSize:25}}>Appointment Information</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <Typography variant="h6" sx={{fontWeight:600, color:'#00A7B5', mb:3}}> Doctor Details: </Typography>
                        <Typography><strong>Doctor Name :</strong> {selectAppointment?.doctor?.user?.userName}</Typography>
                        <Typography><strong>Experience :</strong> {selectAppointment?.doctor?.experience}</Typography>
                        <Typography><strong>Specialization :</strong> {selectAppointment?.doctor?.specialization}</Typography>
                        <Divider />
                        <Typography variant="h6" sx={{fontWeight:600, color:'#00A7B5', mb:3}}> Patient Details: </Typography>
                        <Typography><strong>Patient Name :</strong> {selectAppointment?.user?.userName}</Typography>
                        <Typography><strong>Gender :</strong> {selectAppointment?.user?.patient?.gender}</Typography>
                        <Typography><strong>Age :</strong> {selectAppointment?.user?.patient?.age}</Typography>
                        <Typography><strong>Blood Group :</strong> {selectAppointment?.user?.patient?.bloodGroup}</Typography>
                        <Typography><strong>Status :</strong> {selectAppointment?.status && "Active"}</Typography>
                        <Typography><strong>Email :</strong> {selectAppointment?.user?.email}</Typography>
                        <Typography><strong>Contact :</strong> {selectAppointment?.user?.phone}</Typography>
                        <Typography><strong>Emergency Number :</strong> {selectAppointment?.user?.patient?.emergencyNumber}</Typography>
                        <Typography><strong>Address :</strong> {selectAppointment?.user?.patient?.address}</Typography>
                        <Divider />
                        <Typography variant="h6" sx={{fontWeight:600, color:'#00A7B5', mb:3}}> Appointment Details: </Typography>
                        <Typography><strong>Appointment Date :</strong> {selectAppointment?.createdAt}</Typography>
                        <Typography><strong>Time Slot:</strong> {selectAppointment?.timeSlot}</Typography>
                        <Typography><strong>Status:</strong> {selectAppointment?.status}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={()=>setOpenViewAppointment(false)}
                        sx={{backgroundColor:'#00A7B5', color:'white'}}
                    >Close</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default ViewAppointmentModal;
