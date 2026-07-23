import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { UPDATEPRESCRIPTION, GETMYPRESCRIPTIONS } from "../../query/doctor/Prescription";
import { useMutation } from "@apollo/client/react";
import { validatePrescriptionFields } from "../../validators/prescriptionValidate";
import { handleOnBlurInput } from "../../validators/handleOnBlur";
import { checkValidInput } from "../../validators/checkValidInput";
import { inputValueHandler } from "../../validators/inputValueHandler";
import PrescriptionCompo from "./PrescriptionCompo";
import { prescriptionInputFields } from "../../constants/const";

const UpdatePrescriptionModal = ({ handleClose, open, prescriptionData }) => {
    
    const [updatePrescription] = useMutation(UPDATEPRESCRIPTION, {
        refetchQueries: [GETMYPRESCRIPTIONS],
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
    
    useEffect(() => {
        if (prescriptionData && open) {
            setPrescription({
                appointment: prescriptionData.appointment?.id || "",
                medicine: Array.isArray(prescriptionData.medicine) && prescriptionData.medicine.length > 0
                    ? prescriptionData.medicine
                    : [""],
                dosage: prescriptionData.dosage || "",
                duration: prescriptionData.duration || "",
                instructions: prescriptionData.instructions || "",
            });
            setError({
                appointment: "",
                medicine: "",
                dosage: "",
                duration: "",
                instructions: "",
            });
        }
    }, [prescriptionData, open]);

    const handleChange = (event) => {
        inputValueHandler(event, prescription, setPrescription, error, setError, validatePrescriptionFields);
    }

    const handleOnBlur = (event) => {
        handleOnBlurInput(event, setError, prescription, validatePrescriptionFields);
    }

    const handleUpdatePrescription = async (event) => {
        event.preventDefault();

        try {
            const isValid = checkValidInput(prescriptionInputFields, setError, prescription, validatePrescriptionFields);
            if (!isValid) return;

            const cleanedMedicine = prescription.medicine.map((m) => m.trim()).filter(Boolean);

            const response = await updatePrescription({
                variables: {
                    id: prescriptionData.id,
                    medicine: cleanedMedicine,
                    dosage: prescription.dosage,
                    duration: prescription.duration,
                    instructions: prescription.instructions,
                },
            });
            console.log(response);
            toast.success("Prescription updated successfully!!!");
            handleClose();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <PrescriptionCompo
            title={"Edit Prescription"}
            actionName={"Update"}
            open={open}
            handleClose={handleClose}
            prescription={prescription}
            setPrescription={setPrescription}
            error={error}
            handleChange={handleChange}
            handleOnBlur={handleOnBlur}
            handleActionPrescription={handleUpdatePrescription}
            appointments={prescriptionData?.appointment ? [prescriptionData.appointment] : []}
        />
    )
}
export default UpdatePrescriptionModal;