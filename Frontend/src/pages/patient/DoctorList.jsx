import LoadingCompo from "../../common/Loading";
import { GETDOCTORS } from "../../query/doctor/doctorQuery";
import { useQuery } from '@apollo/client/react';
import DoctorProfileCard from "./DoctorCard";
import { Box, Grid, Typography } from "@mui/material";

const DoctorList = () => {

    const { data: doctorData, loading: doctorLoading } = useQuery(GETDOCTORS);

    if (doctorLoading) return <LoadingCompo />
    console.log("all doctors are: ", doctorData);

    return (
        <>
            <Box sx={{ mx: 5, my: 18 }}>
                <Typography variant="h4" color="initial" sx={{ fontWeight: 700, color: '#00A7B5' }}>All Doctors </Typography>
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    {doctorData?.getDoctors?.map((doctor) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id}>
                            <DoctorProfileCard doctor={doctor} />
                        </Grid>
                    ))}
                </Grid>

            </Box>
        </>
    )
}
export default DoctorList;