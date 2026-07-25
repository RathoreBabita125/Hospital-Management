import {
    Avatar,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatTime } from "../../common/formatTime";
import { useNavigate } from 'react-router-dom'

const InfoRow = ({ icon, label, value }) => (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1 }}>
        {icon}
        <Typography sx={{ minWidth: 130, fontWeight: 600 }}>
            {label}
        </Typography>
        <Typography color="text.secondary">{value}</Typography>
    </Stack>
);

const DoctorProfileModal = ({ open, handleClose, doctor }) => {

    console.log("Doctor details in doctor profile : ", doctor);
    const navigate = useNavigate();

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
                handleClose();
            }}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    height: "80vh",
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    fontWeight: 700,
                    color: "#00A7B5",
                    position: "sticky",
                    top: 0,
                    bgcolor: "background.paper",
                    zIndex: 10,
                    borderBottom: "1px solid #e0e0e0",
                }}
            >
                Doctor Profile
            </DialogTitle>

            <DialogContent
                sx={{
                    overflowY: "auto",
                    py: 3,
                    px: 3,
                }}
            >
                {/* Profile */}
                <Stack alignItems="center" spacing={1.5} mb={3}>
                    <Avatar
                        src={doctor?.image}
                        sx={{
                            width: 90,
                            height: 90,
                            border: "3px solid #00A7B5",
                        }}
                    />

                    <Typography variant="h6" fontWeight={700}>
                        {doctor?.user?.userName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {doctor?.specialization}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip
                            label={doctor?.department}
                            sx={{
                                bgcolor: "#E6F7F8",
                                color: "#00A7B5",
                                fontWeight: 600,
                            }}
                        />

                        <Chip
                            label={`${doctor?.experience} Years`}
                            sx={{
                                bgcolor: "#E6F7F8",
                                color: "#00A7B5",
                                fontWeight: 600,
                            }}
                        />
                    </Stack>
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Professional */}
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="#00A7B5"
                    mb={2}
                >
                    Professional Information
                </Typography>

                <InfoRow
                    icon={<LocalHospitalIcon sx={{ color: '#00A7B5' }} />}
                    label="Department"
                    value={doctor?.department}
                />

                <InfoRow
                    icon={<MedicalServicesIcon sx={{ color: '#00A7B5' }} />}
                    label="Specialization"
                    value={doctor?.specialization}
                />

                <InfoRow
                    icon={<SchoolIcon sx={{ color: '#00A7B5' }} />}
                    label="Qualification"
                    value={doctor?.qualification}
                />

                <InfoRow
                    icon={<WorkspacePremiumIcon sx={{ color: '#00A7B5' }} />}
                    label="Experience"
                    value={`${doctor?.experience} Years`}
                />

                <InfoRow
                    icon={<CalendarMonthIcon sx={{ color: '#00A7B5' }} />}
                    label="Available Date"
                    value={doctor?.availability?.[0] ? new Date(doctor?.availability[0]?.availableDate).toLocaleDateString() : '-'}
                />

                <InfoRow
                    icon={<AccessTimeIcon sx={{ color: '#00A7B5' }} />}
                    label="Timing"
                    value={doctor?.availability?.[0] ? `${formatTime(doctor?.availability?.[0]?.fromTime)} - ${formatTime(doctor?.availability?.[0]?.toTime)}` : '-'}
                />

                <Divider sx={{ my: 3 }} />

                {/* Personal */}
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="#00A7B5"
                    mb={2}
                >
                    Personal Information
                </Typography>

                <InfoRow
                    icon={<EmailIcon sx={{ color: '#00A7B5' }} />}
                    label="Email"
                    value={doctor?.user?.email}
                />

                <InfoRow
                    icon={<PhoneIcon sx={{ color: '#00A7B5' }} />}
                    label="Phone"
                    value={doctor?.user?.phone}
                />

                <InfoRow
                    icon={<LocationOnIcon sx={{ color: '#00A7B5' }} />}
                    label="Address"
                    value={doctor?.address}
                />


                {/* About */}
                {
                    doctor?.about &&
                    <>
                        <Divider sx={{ my: 3 }} />
                        <Typography
                            variant="subtitle1"
                            sx={{ color: '#00A7B5', fontWeight: 700 }}
                            mb={2}
                        >
                            About Doctor
                        </Typography>

                        <Typography color="text.secondary" lineHeight={1.8}>
                            {doctor?.about ||
                                "Experienced healthcare professional committed to providing high-quality patient care with compassion and expertise."}
                        </Typography>
                    </>
                }
            </DialogContent>

            <DialogActions
                sx={{
                    position: "sticky",
                    bottom: 0,
                    bgcolor: "background.paper",
                    borderTop: "1px solid #e0e0e0",
                    p: 2,
                }}
            >
                <Button onClick={handleClose} variant="outlined" sx={{ color: '#00A7B5' }}>
                    Close
                </Button>

                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#00A7B5",
                        "&:hover": {
                            bgcolor: "#008C98",
                        },
                    }}
                    onClick={() => navigate('/patient-book-appointment', {
                        state: {
                            doctor: doctor
                        }
                    })}
                >
                    Book Appointment
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DoctorProfileModal;