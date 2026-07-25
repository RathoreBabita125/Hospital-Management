import { useState } from "react";
import { toast } from 'react-toastify';
import { ADDDOCTOR, GETDOCTORS } from "../../query/doctor/doctorQuery";
import { useMutation } from "@apollo/client/react";
import { validateDoctorFields } from "../../validators/doctorValidate";
import { handleOnBlurInput } from "../../validators/handleOnBlur";
import { checkValidInput } from "../../validators/checkValidInput";
import { inputValueHandler } from "../../validators/inputValueHandler";
import DoctorFormCompo from "./DoctorFormCompo";
import { doctorInputFields } from "../../constants/const";

const AddDoctorModal = ({ handleClose, open, refetch}) => {

    const [addDoctor] = useMutation(ADDDOCTOR,{
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
        experience: "",
        consultationFee: "",
        qualification:"",
        address:"",
        image:null,
        status: true,
    });

    // Handles input value updates and clears validation errors
    const handleChange = (event) => {
        inputValueHandler(event, doctor, setDoctor, error, setError, validateDoctorFields);
    }

    // Performs field-level validation when an input loses focus
    const handleOnBlur = (event) => {
        handleOnBlurInput(event, setError, doctor, validateDoctorFields);
    }

    const handleAddDoctor = async (event) => {
        event.preventDefault();

        try {
            //check validation
            const isValid = checkValidInput(doctorInputFields, setError, doctor, validateDoctorFields);
            if (!isValid) return;

            const response = await addDoctor({
                variables: {
                    userName: doctor.userName,
                    email: doctor.email,
                    password: doctor.password,
                    phone: doctor.phone,
                    department: doctor.department,
                    specialization: doctor.specialization,
                    experience: Number(doctor.experience),
                    qualification:doctor.qualification,
                    address:doctor.address,
                    image: doctor.image || "",
                    consultationFee: Number(doctor.consultationFee),
                    status: doctor.status,
                },
            });
            console.log(response);
            await refetch();
            toast.success("You have added doctor successfully!!!");
            setDoctor({
                userName: "",
                email: "",
                password: "",
                phone: "",
                department: "",
                specialization: "",
                experience: "",
                qualification:"",
                address:"",
                image:"",
                consultationFee: "",
                status: true,
            });
            handleClose();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <DoctorFormCompo
            title={"Add New Doctor"}
            actionName={"Add Doctor"}
            open={open}
            handleClose={handleClose}
            doctor={doctor}
            setDoctor={setDoctor}
            error={error}
            handleChange={handleChange}
            handleOnBlur={handleOnBlur}
            handleActionDoctor={handleAddDoctor}
        />
    )
}
export default AddDoctorModal;