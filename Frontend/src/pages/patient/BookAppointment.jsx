import { useMutation } from "@apollo/client/react";
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
import { BOOKAPPOINTMENT } from "../../query/patient/appointmentQuery";
import { toast } from "react-toastify";

const BookAppointment = () => {
    const [bookAppointment]=useMutation(BOOKAPPOINTMENT);
    const [appointment, setAppointment] = useState({
        doctor: "",
        department: "",
        availableDate: "",
        timeSlot: "",
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAppointment((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {         
            console.log("hi");
            
            const response=await bookAppointment({
              variables:{
                doctor:appointment.doctor,
                department:appointment.department,
                availableDate:appointment.availableDate,
                timeSlot:appointment.timeSlot
              }
            });
            console.log(appointment);        
            console.log("response: ", response);        
            if(response){
                toast.success("Appointment has been booked successfully.");
                setAppointment({
                    doctor: "",
                    department: "",
                    availableDate: "",
                    timeSlot: "",
                })
            }
        } catch (error) {
            toast.error(error.message)
            console.log("Complete Error:", error);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <Box sx={{ width: '90%', mt: 25 }}>
                <Paper elevation={5} sx={{ p: 10, maxWidth: 800, mx: "auto" }}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        color="primary"
                        mb={3}
                        sx={{ color: '#00A7B5', fontWeight: 600 }}
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
                                <MenuItem value="Cardiology">Cardiology</MenuItem>
                                <MenuItem value="Neurology">Neurology</MenuItem>
                                <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                                <MenuItem value="Dermatology">Dermatology</MenuItem>
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
                            >
                                <MenuItem value="1">Dr. Amit Sharma</MenuItem>
                                <MenuItem value="2">Dr. Priya Singh</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ width: 600 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Appointment Date"
                                name="availableDate"
                                value={appointment.availableDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ width: 600 }}>
                            <TextField
                                select
                                fullWidth
                                label="Time Slot"
                                name="timeSlot"
                                value={appointment.timeSlot}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: false }}
                            >
                                <MenuItem value="09:00 AM">09:00 AM</MenuItem>
                                <MenuItem value="10:00 AM">10:00 AM</MenuItem>
                                <MenuItem value="11:00 AM">11:00 AM</MenuItem>
                                <MenuItem value="02:00 PM">02:00 PM</MenuItem>
                                <MenuItem value="03:00 PM">03:00 PM</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sx={{ width: 600 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleSubmit}
                                sx={{ backgroundColor: '#00A7B5', padding: 2 }}
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