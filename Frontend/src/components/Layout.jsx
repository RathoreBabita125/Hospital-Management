import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout=()=>{
    return(
        <>
            <Sidebar/>
            <Navbar/>
            <Box sx={{mt:10, ml:45}}>
                <Outlet/>
            </Box>
        </>
    )
}
export default Layout;