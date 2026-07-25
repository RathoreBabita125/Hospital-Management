import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Button, Typography, Stack, Chip } from "@mui/material";

const ViewPrescriptionModal = ({ open, onClose, prescription }) => {

    if (!prescription) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box sx={{padding:3}}>
                <DialogTitle sx={{ color: "#00A7B5", fontWeight: 600, fontSize:22 }}>
                    Prescription Details
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Doctor</Typography>
                            <Typography>{prescription?.appointment?.doctor?.user?.userName || "-"}</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">Department</Typography>
                            <Typography>{prescription?.appointment?.doctor?.department || "-"}</Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="caption" color="text.secondary">Medicines</Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                                {prescription?.medicine?.length ? (
                                    prescription.medicine.map((med, i) => (
                                        <Chip key={i} label={med}  sx={{ backgroundColor: "#e0f7fa", color: "#00A7B5" }} />
                                    ))
                                ) : (
                                    <Typography>-</Typography>
                                )}
                            </Stack>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">Dosage</Typography>
                            <Typography>{prescription?.dosage || "-"}</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">Duration</Typography>
                            <Typography>{prescription?.duration || "-"}</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">Instructions</Typography>
                            <Typography>{prescription?.instructions || "-"}</Typography>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button variant="outlined" sx={{ backgroundColor: '#00A7B5', color:'white' }} onClick={onClose}>
                        Close
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default ViewPrescriptionModal;