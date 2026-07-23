import { useMutation, useQuery } from "@apollo/client/react";
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { BOOKAPPOINTMENT, GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import { toast } from "react-toastify";
import { GETDOCTORS } from "../../query/doctor/doctorQuery";
import { allDepartments } from "../../constants/const";

const BookAppointment = () => {
    const [bookAppointment] = useMutation(BOOKAPPOINTMENT, {
        refetchQueries: [GETAPPOINTMENTS],
        pollInterval: 5000,
    });

    const [appointment, setAppointment] = useState({
        doctor: "",
        department: "",
        availableDate: "",
        timeSlot: "",
    });

    const { data: doctorData } = useQuery(GETDOCTORS, {
        variables: {
            department: appointment.department,
        },
        skip: !appointment.department,
        pollInterval: 5000,
    });

    const formatTime = (time) => {
        if (!time) return "";
        const [hour, minute] = time.split(":");
        const date = new Date();
        date.setHours(Number(hour), Number(minute));
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const selectedDoctor = doctorData?.getDoctors?.find(
        (doctor) => doctor.id === appointment.doctor
    );

    const availableSlots = selectedDoctor?.availability?.filter(
        (slot) => !slot.isBooked
    ) || [];

    const uniqueDates = [
        ...new Map(
            availableSlots.map((slot) => [slot.availableDate, slot])
        ).values(),
    ];

    const slotsForSelectedDate = availableSlots.filter(
        (slot) => slot.availableDate === appointment.availableDate
    );

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "department") {
            setAppointment((prev) => ({
                ...prev,
                department: value,
                doctor: "",
                availableDate: "",
                timeSlot: "",
            }));
            return;
        }

        if (name === "doctor") {
            setAppointment((prev) => ({
                ...prev,
                doctor: value,
                availableDate: "",
                timeSlot: "",
            }));
            return;
        }

        if (name === "availableDate") {
            setAppointment((prev) => ({
                ...prev,
                availableDate: value,
                timeSlot: "",
            }));
            return;
        }

        setAppointment((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !appointment.department ||
            !appointment.doctor ||
            !appointment.availableDate ||
            !appointment.timeSlot
        ) {
            toast.error("Please fill all fields before booking.");
            return;
        }

        try {
            const response = await bookAppointment({
                variables: {
                    doctor: appointment.doctor,
                    department: appointment.department,
                    availableDate: appointment.availableDate,
                    timeSlot: appointment.timeSlot,
                },
            });

            if (response) {
                toast.success("Appointment has been booked successfully.");
                setAppointment({
                    doctor: "",
                    department: "",
                    availableDate: "",
                    timeSlot: "",
                });
            }
        } catch (error) {
            toast.error(error?.message || "Failed to book appointment.");
        }
    };

    return (
        <Box sx={{ width: "100%", height: "100vh" }}>
            <Box sx={{ width: "90%", mt: 25 }}>
                <Paper elevation={5} sx={{ p: 10, maxWidth: 800, mx: "auto" }}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        color="primary"
                        mb={3}
                        sx={{ color: "#00A7B5", fontWeight: 600 }}
                    >
                        Book Appointment
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 3 }}>
                        <Grid item xs={12} sx={{ width: 600 }}>
                            <TextField
                                select
                                fullWidth
                                label="Department"
                                name="department"
                                value={appointment.department}
                                onChange={handleChange}
                            >
                                {allDepartments?.map((department) => (
                                    <MenuItem key={department} value={department}>
                                        {department}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sx={{ width: 600 }}>
                            <TextField
                                select
                                fullWidth
                                label="Doctor"
                                name="doctor"
                                value={appointment.doctor}
                                onChange={handleChange}
                                disabled={!appointment.department}
                            >
                                {doctorData?.getDoctors?.length ? (
                                    doctorData.getDoctors.map((doctor) => (
                                        doctor.status &&
                                        <MenuItem key={doctor.id} value={doctor.id}>
                                            {doctor.user.userName}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No Doctors Available</MenuItem>
                                )}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sx={{ width: 600 }}>
                            <TextField
                                select
                                fullWidth
                                label="Appointment Date"
                                name="availableDate"
                                value={appointment.availableDate}
                                onChange={handleChange}
                                disabled={!appointment.doctor}
                            >
                                {uniqueDates.length ? (
                                    uniqueDates.map((slot) => (
                                        <MenuItem
                                            key={slot.availableDate}
                                            value={slot.availableDate}
                                        >
                                            {new Date(slot.availableDate).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No Dates Available</MenuItem>
                                )}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ width: 600 }}>
                            <TextField
                                select
                                fullWidth
                                label="Time Slot"
                                name="timeSlot"
                                value={appointment.timeSlot}
                                onChange={handleChange}
                                disabled={!appointment.availableDate}
                                InputLabelProps={{ shrink: false }}
                            >
                                {slotsForSelectedDate.length ? (
                                    slotsForSelectedDate.map((slot) => {
                                        const label = `${formatTime(slot.fromTime)} - ${formatTime(
                                            slot.toTime
                                        )}`;
                                        return (
                                            <MenuItem key={slot.id} value={label}>
                                                {label}
                                            </MenuItem>
                                        );
                                    })
                                ) : (
                                    <MenuItem disabled>No Slots Available</MenuItem>
                                )}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sx={{ width: 600 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleSubmit}
                                sx={{ backgroundColor: "#00A7B5", padding: 2 }}
                            >
                                Book Appointment
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Box>
    );
};
export default BookAppointment;