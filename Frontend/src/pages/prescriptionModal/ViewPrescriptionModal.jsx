import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Stack, Typography, Chip, Divider
} from "@mui/material";

const ViewPrescriptionModal = ({ open, handleClose, prescription }) => {

    if (!prescription) return null;

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
            maxWidth="sm"
        >
            <Box sx={{ padding: 3 }}>
                <DialogTitle
                    sx={{
                        fontWeight: 600,
                        color: "#00A7B5",
                    }}
                >
                    Prescription Details
                </DialogTitle>
                <DialogContent dividers>
                    <Stack direction="column" spacing={2}>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Patient Name
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                                {prescription?.appointment?.user?.userName || "-"}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Appointment Date
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                                {prescription?.appointment?.availableDate
                                    ? new Date(prescription.appointment.availableDate).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })
                                    : "-"}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Department
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                                {prescription?.appointment?.department || "-"}
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Medicines
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
                                {Array.isArray(prescription?.medicine) && prescription.medicine.length > 0 ? (
                                    prescription.medicine.map((med, index) => (
                                        <Chip
                                            key={index}
                                            label={med}
                                            sx={{ backgroundColor: "#e0f7fa", color: "#00A7B5" }}
                                        />
                                    ))
                                ) : (
                                    <Typography variant="body1">-</Typography>
                                )}
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Dosage
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                                {prescription?.dosage || "-"}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Duration
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                                {prescription?.duration || "-"}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Instructions
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                                {prescription?.instructions || "-"}
                            </Typography>
                        </Box>

                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#00A7B5",
                            "&:hover": {
                                bgcolor: "#00838F",
                            },
                        }}
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default ViewPrescriptionModal;