import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
    
    const [mobileOpen, setMobileOpen] = useState(false);
    const drawerWidth = 360;

    return (
        <>
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} drawerWidth={drawerWidth}/>
            <Navbar setMobileOpen={setMobileOpen} drawerWidth={drawerWidth}/>
            <Box sx={{ mt: 10, ml: 45 }}>
                <Outlet />
            </Box>
        </>
    )
}
export default Layout;