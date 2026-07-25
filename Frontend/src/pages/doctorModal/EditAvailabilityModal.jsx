import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { GETMYAVAILABILITY, UPDATEAVAILABILITY } from "../../query/doctor/doctorAvailability";
import AvailabilityFormModal from "./AvailabilityForm";

const EditAvailabilityModal = ({ open, onClose, selectedAvailability, refetch }) => {
    const [updateAvailability] = useMutation(UPDATEAVAILABILITY, {
        refetchQueries: [GETMYAVAILABILITY]
    });

    const [form, setForm] = useState({
        availableDate: "",
        fromTime: "",
        toTime: "",
        slotDuration: "",
    });

    useEffect(() => {
        if (selectedAvailability) {
            setForm({
                availableDate: selectedAvailability.availableDate?.slice(0, 10) || "",
                fromTime: selectedAvailability.fromTime || "",
                toTime: selectedAvailability.toTime || "",
                slotDuration:selectedAvailability.slotDuration || ""
            });
        }
    }, [selectedAvailability]);

    const handleSubmit = async () => {
        if (!form.availableDate || !form.fromTime || !form.toTime) {
            toast.error("Please fill all fields.");
            return;
        }
        if (form.fromTime >= form.toTime) {
            toast.error("From Time must be earlier than To Time.");
            return;
        }

        try {
            await updateAvailability({
                variables: {
                    id: selectedAvailability.id,
                    ...form,
                },
            });
            toast.success("Availability updated successfully.");
            await refetch();
            onClose();
        } catch (error) {
            toast.error(error?.message || "Failed to update availability.");
        }
    };

    return (
        <AvailabilityFormModal
            open={open}
            onClose={onClose}
            title="Edit Availability"
            actionName="Update"
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
        />
    );
};
export default EditAvailabilityModal;