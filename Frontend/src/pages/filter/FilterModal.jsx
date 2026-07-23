import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";
import { allDepartments, appointmentStatus, bloodGroups, genders, specializations, statusOptions } from "../../constants/const";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loading";
import { GETMYPRESCRIPTIONS } from "../../query/doctor/Prescription";

const FilterModal = ({ open, onClose, setOpenFilter, setFilter, setPage, columnOptions, filterField, filter }) => {
    const [column, setColumn] = useState("");
    const [inputValue, setInputValue] = useState("");
    const { data: prescriptionData, loading: prescriptionLoading } = useQuery(GETMYPRESCRIPTIONS)

    useEffect(() => {
        if (open && filter) {
            const activeField = filterField.find((field) => filter[field]);
            if (activeField) {
                setColumn(activeField);
                setInputValue(filter[activeField]);
            } else {
                setColumn("");
                setInputValue("");
            }
        }
    }, [open, filter, filterField]);

    const handleApply = () => {

        if (!column) return;

        const resetInputField = {};
        filterField.forEach((field) => (resetInputField[field] = ""));

        setFilter({
            ...resetInputField,
            [column]: inputValue,
        });

        setPage(0);
        setOpenFilter(false);
    };

    const handleReset = () => {
        setColumn("");
        setInputValue("");
        const resetInputField = {};
        filterField.forEach((field) => resetInputField[field] = "");
        setFilter(resetInputField);
        setPage(0);
    };

    if (prescriptionLoading) return <LoadingCompo />

    const availableDates = Array.from(
        new Set(
            (prescriptionData?.getMyPrescriptions || [])
                .map((p) => p?.appointment?.availableDate)
                .filter(Boolean)
        )
    );

    const renderValueInput = () => {
        if (column === "appointStatus") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Status</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Status"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Status</MenuItem>
                        {appointmentStatus.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        if (column === "status") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Status</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Status"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Status</MenuItem>
                        {statusOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        if (column === "department") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Department</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Department"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Department</MenuItem>
                        {allDepartments.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        if (column === "specialization") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Specialization</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Specialization"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Specialization</MenuItem>
                        {specializations.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        if (column === "bloodGroup") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Blood Group</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Blood Group"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Blood Group</MenuItem>
                        {bloodGroups.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        if (column === "gender") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Gender</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Gender"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Gender</MenuItem>
                        {genders.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        if (column === "appointmentDate") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Appointment Date</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Appointment Date"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Appointment Date</MenuItem>
                        {availableDates.map((date) => (
                            <MenuItem key={date} value={date}>
                                {new Date(date).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        return (
            <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                label="Enter filter value"
                fullWidth
                margin="normal"
                color="success"
                disabled={!column}
            />
        );
    };
    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
                onClose();
            }}
            fullWidth
            maxWidth="sm"
        >
            <Box sx={{ padding: 1 }}>
                <Box sx={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", color: "#053348"
                }}>
                    <DialogTitle sx={{ fontWeight: "bold", fontSize: "25px", color: '#00A7B5' }}>Filter</DialogTitle>
                    <ClearIcon sx={{ marginRight: 3, cursor: "pointer" }}
                        onClick={() => setOpenFilter(false)} />
                </Box>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel color="success">Select Column</InputLabel>
                        <Select
                            value={column}
                            onChange={(e) => { setColumn(e.target.value); setInputValue(""); }}
                            label="Select Column"
                            color="success"
                        >
                            <MenuItem value="" disabled>Select Column</MenuItem>
                            {columnOptions?.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {renderValueInput()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReset} variant="outlined" sx={{ color: '#00A7B5' }}>Reset Filter</Button>
                    <Button onClick={handleApply} sx={{ backgroundColor: '#00A7B5', color: 'white' }}>Apply Filter</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
export default FilterModal;