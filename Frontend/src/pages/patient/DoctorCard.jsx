import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Stack,
    Box,
    Button,
} from "@mui/material";
import { useState } from "react";
import DoctorProfileModal from "../doctorModal/DoctorProfile";

const DoctorProfileCard = ({ doctor }) => {

    const [openDoctor, setOpenDoctor] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    return (
        <Card
            sx={{
                width: 310,
                borderRadius: 3,
                boxShadow: 3,
            }}
        >
            <Box sx={{ padding: 3 }}>
                <CardMedia
                    component="img"
                    height="220"
                    image={
                        doctor.image.startsWith("data:")
                            ? doctor.image
                            : doctor.image
                    }
                />
                <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <Stack direction={'column'} spacing={1.5}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {doctor?.user?.userName}
                        </Typography>

                        <Typography color="text.secondary" mb={2} variant="caption">
                            {doctor.specialization}
                        </Typography>

                        <Stack direction="row" spacing={1} mb={2}>
                            <Chip
                                label={doctor.department}
                                sx={{ backgroundColor: "#e0f7fa", color: "#00A7B5" }}
                            />
                            <Chip
                                label={`${doctor.experience} Years`}
                                sx={{ backgroundColor: "#e0f7fa", color: "#00A7B5" }}
                            />
                        </Stack>
                        <br />
                        <Button
                            sx={{ color: '#00A7B5' }}
                            variant="outlined"
                            onClick={() => {
                                setOpenDoctor(true);
                                setSelectedDoctor(doctor);
                            }}
                        > View More</Button>
                    </Stack>
                </CardContent>

                <DoctorProfileModal
                    open={openDoctor}
                    handleClose={() => setOpenDoctor(false)}
                    doctor={selectedDoctor}
                />.
            </Box>
        </Card>
    );
}
export default DoctorProfileCard;

