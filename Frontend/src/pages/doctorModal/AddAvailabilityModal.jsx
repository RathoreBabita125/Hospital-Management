import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { ADDAVAILABILITY, GETMYAVAILABILITY } from "../../query/doctor/doctorAvailability";
import AvailabilityFormModal from "./AvailabilityForm";

const AddAvailabilityModal = ({ open, onClose, refetch }) => {

    const [addAvailability] = useMutation(ADDAVAILABILITY, {
        refetchQueries: [GETMYAVAILABILITY]
    });

    const [form, setForm] = useState({
        availableDate: "",
        fromTime: "",
        toTime: "",
        slotDuration: "",
    });

    const handleSubmit = async () => {

        if (!form.availableDate ||!form.fromTime ||!form.toTime ||!form.slotDuration) {
            // toast.error("Please fill all fields.");
            toast.error("Please fill all fields.");
            return;
        }

        if (form.fromTime >= form.toTime) {
            toast.error("From Time must be earlier than To Time.");
            return;
        }

        try {
            await addAvailability({
                variables: form
            });
            toast.success("Availability added successfully.");
            await refetch();
            onClose();

        } catch (error) {
            toast.error(
                error?.message || "Failed to add availability."
            );
        }
    };

    return (
        <AvailabilityFormModal
            open={open}
            onClose={onClose}
            title="Add Availability"
            actionName="Add"
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
        />
    );
};
export default AddAvailabilityModal;