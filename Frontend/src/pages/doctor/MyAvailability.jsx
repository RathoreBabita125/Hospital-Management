import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import { useState } from "react";
import AddAvailabilityModal from "../doctorModal/AddAvailabilityModal";
import EditAvailabilityModal from "../doctorModal/EditAvailabilityModal";
import { GETMYAVAILABILITY } from "../../query/doctor/doctorAvailability";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteAvailabilityModal from "../doctorModal/DeleteAvailabilityModal";

const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(Number(hour), Number(minute));
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
};

const MyAvailability = () => {

    const { data, loading, refetch } = useQuery(GETMYAVAILABILITY);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedAvailability, setSelectedAvailability] = useState(null);

    if (loading) return <LoadingCompo />;

    const availabilityList = data?.getMyAvailability || [];

    const handleEditClick = (availability) => {
        setSelectedAvailability(availability);
        setOpenEdit(true);
    };

    return (
        <>
            <Box sx={{ mt: 20, padding: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                    <Typography variant="h5" sx={{ color: "#00A7B5", fontWeight: 600 }}>
                        My Availability
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ backgroundColor: "#00A7B5", textTransform: "none" }}
                        onClick={() => setOpenAdd(true)}
                    >
                        Add Availability
                    </Button>
                </Box>

                <TableContainer sx={{ backgroundColor: "#ffffff", borderRadius: 2, width: "100%", overflowX: "auto" }}>
                    <Table sx={{ backgroundColor: "#ffffff", width: "100%", minWidth: 800 }}>
                        <TableHead sx={{ backgroundColor: "#00A7B5" }}>
                            <TableRow>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>S.No.</TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>Available Date</TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>From Time</TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>To Time</TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>Status</TableCell>
                                <TableCell align="center" sx={{ color: "white", fontSize: 18, border: '2px solid white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {availabilityList.map((slot, index) => (
                                <TableRow hover key={slot.id}>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{index + 1}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                        {new Date(slot.availableDate).toLocaleDateString("en-GB")}
                                    </TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{formatTime(slot.fromTime)}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>{formatTime(slot.toTime)}</TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                        <Chip
                                            label={slot.isBooked ? "Booked" : "Available"}
                                            sx={{ backgroundColor: '#00A7B5', color: 'white' }}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ border: '1px solid #b4e8ed' }}>
                                        <Stack spacing={2} direction={'row'} sx={{justifyContent:'center'}}>
                                            <EditOutlinedIcon
                                                sx={{
                                                    color: slot.isBooked ? "#ccc" : "#00A7B5",
                                                    cursor: slot.isBooked ? "not-allowed" : "pointer",
                                                }}
                                                onClick={() => !slot.isBooked && handleEditClick(slot)}
                                            />
                                            <CancelOutlinedIcon
                                                sx={{
                                                    color: slot.isBooked ? "#ccc" : "#00A7B5",
                                                    cursor: slot.isBooked ? "not-allowed" : "pointer",
                                                }}
                                                onClick={
                                                    () => {
                                                        !slot.isBooked && setSelectedAvailability(slot);
                                                        setOpenDelete(true)
                                                    }
                                                }
                                            />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <AddAvailabilityModal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                refetch={refetch}
            />
            <EditAvailabilityModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                selectedAvailability={selectedAvailability}
                refetch={refetch}
            />
            <DeleteAvailabilityModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                selectedAvailability={selectedAvailability}
                refetch={refetch}
            />

        </>
    );
};
export default MyAvailability;