import LoadingCompo from "../../common/Loading";

const DoctorList=()=>{

    const {data:doctorData, loading:doctorLoading}=useQuery(GETDOCTORS);

    if(doctorLoading) return <LoadingCompo/>
    console.log("all doctors are: ", doctorData);
    

    return(
        <>
            
        </>
    )
}
export default DoctorList;