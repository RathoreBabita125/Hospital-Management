import { useState } from "react";
import { toast } from 'react-toastify';
import { ADDPRESCRIPTION, GETMYPRESCRIPTIONS } from "../../query/doctor/Prescription";
import { GETAPPOINTMENTS } from "../../query/patient/appointmentQuery";
import { useMutation, useQuery } from "@apollo/client/react";
import { validatePrescriptionFields } from "../../validators/prescriptionValidate";
import { handleOnBlurInput } from "../../validators/handleOnBlur";
import { checkValidInput } from "../../validators/checkValidInput";
import { inputValueHandler } from "../../validators/inputValueHandler";
import PrescriptionCompo from "./PrescriptionCompo";
import { prescriptionInputFields } from "../../constants/const";

const AddPrescriptionModal = ({ handleClose, open }) => {
    const [addPrescription] = useMutation(ADDPRESCRIPTION, {
        refetchQueries: [GETMYPRESCRIPTIONS]
    });

    const { data: appointmentData } = useQuery(GETAPPOINTMENTS, {
        variables: { status: "CONFIRMED" },
        skip: !open,
    });

    const [prescription, setPrescription] = useState({
        appointment: "",
        medicine: [""],
        dosage: "",
        duration: "",
        instructions: "",
    });

    const [error, setError] = useState({
        appointment: "",
        medicine: "",
        dosage: "",
        duration: "",
        instructions: "",
    });

    const handleChange = (event) => {
        inputValueHandler(event, prescription, setPrescription, error, setError, validatePrescriptionFields);
    }

    const handleOnBlur = (event) => {
        handleOnBlurInput(event, setError, prescription, validatePrescriptionFields);
    }

    const handleAddPrescription = async (event) => {
        event.preventDefault();

        try {
            const isValid = checkValidInput(prescriptionInputFields, setError, prescription, validatePrescriptionFields);
            if (!isValid) return;

            const cleanedMedicine = prescription.medicine.map((m) => m.trim()).filter(Boolean);

            const response = await addPrescription({
                variables: {
                    appointment: prescription.appointment,
                    medicine: cleanedMedicine,
                    dosage: prescription.dosage,
                    duration: prescription.duration,
                    instructions: prescription.instructions,
                },
            });
            console.log(response);
            toast.success("Prescription added successfully!!!");
            setPrescription({
                appointment: "",
                medicine: [""],
                dosage: "",
                duration: "",
                instructions: "",
            });
            handleClose();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <PrescriptionCompo
            title={"Add Prescription"}
            actionName={"Add"}
            open={open}
            handleClose={handleClose}
            prescription={prescription}
            setPrescription={setPrescription}
            error={error}
            handleChange={handleChange}
            handleOnBlur={handleOnBlur}
            handleActionPrescription={handleAddPrescription}
            appointments={appointmentData?.getAppointments || []}
        />
    )
}
export default AddPrescriptionModal;