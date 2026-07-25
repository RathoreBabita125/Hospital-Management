import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { GETDOCTORS, UPDATEDOCTOR } from "../../query/doctor/doctorQuery";
import { inputValueHandler } from "../../validators/inputValueHandler";
import { validateDoctorFields } from "../../validators/doctorValidate";
import { handleOnBlurInput } from "../../validators/handleOnBlur";
import DoctorFormCompo from "./DoctorFormCompo";

const EditDoctorModal = ({ open, handleClose, selectedDoctor, setOpenEditDoctor }) => {

    const [updateDoctor] = useMutation(UPDATEDOCTOR,{
        refetchQueries:[GETDOCTORS]
    });

    const [doctor, setDoctor] = useState({
        userName: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        specialization: "",
        experience: "",
        consultationFee: "",
        qualification:"",
        address:"",
        image:"",
        status: true,
    });

    const [error, setError] = useState({
        userName: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        specialization: "",
        experience: null,
        consultationFee: "",
        qualification:"",
        address:"",
        image:"",
        status: true,
    });

    useEffect(() => {
        if (selectedDoctor) {
            setDoctor({
                userName: selectedDoctor.user.userName,
                email: selectedDoctor.user.email,
                password: "",
                phone: selectedDoctor.user.phone,
                department: selectedDoctor.department,
                specialization: selectedDoctor.specialization,
                experience: selectedDoctor.experience,
                consultationFee: selectedDoctor.consultationFee,
                qualification:selectedDoctor.qualification,
                address:selectedDoctor.address,
                image:selectedDoctor.image,
                status: selectedDoctor.status
            });
        }
    }, [selectedDoctor]);

    // input handler
    const handleChange = (event) => {
        inputValueHandler(event, doctor, setDoctor, error, setError, validateDoctorFields);
    }

    //handle onBlur
    const handleOnBlur = (event) => {
        handleOnBlurInput(event, setError, doctor, validateDoctorFields);
    }

    const handleEditDoctor = async () => {
        try {
            await updateDoctor({
                variables: {
                    id: selectedDoctor.id,
                    userName: doctor.userName,
                    email: doctor.email,
                    password: doctor.password,
                    phone: doctor.phone,
                    department: doctor.department,
                    specialization: doctor.specialization,
                    experience: Number(doctor.experience),
                    consultationFee: Number(doctor.consultationFee),
                    qualification:doctor.qualification,
                    address:doctor.address,
                    image:doctor.image,
                    status: doctor.status,
                },
            });
            toast.success("Doctor updated successfully.");
            setOpenEditDoctor(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (  
        <DoctorFormCompo
            title={"Edit Existing Doctor"}
            actionName={"Edit Doctor"}
            open={open}
            handleClose={handleClose}
            doctor={doctor}
            setDoctor={setDoctor}
            error={error}
            handleChange={handleChange}
            handleOnBlur={handleOnBlur}
            handleActionDoctor={handleEditDoctor}
        />
    )
}
export default EditDoctorModal;