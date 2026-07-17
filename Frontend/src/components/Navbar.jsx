import { useContext, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@apollo/client/react";
import { LOGOUT } from "../query/login/userQuery";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from "@apollo/client/react";

const Navbar = ({ setMobileOpen }) => {

  let { userAuth, refetch } = useContext(AuthContext);
  const [logout] = useMutation(LOGOUT);
  const drawerWidth = 300;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const client = useApolloClient();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      await client.resetStore();
      refetch()
      navigate('/login', { replace: true });
      toast.success("You have logged out successfully!!!");
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: "#00A7B5",
      }}
    >
      <Toolbar
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          height: '10vh',
        }}
      >
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setMobileOpen(true)}
          sx={{
            mr: 2,
            display: { md: "none" },
            alignItems: 'center'
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />

        {/* Avatar */}
        <IconButton onClick={handleOpen} >
          <Avatar
            sx={{
              bgcolor: "#fff",
              color: "#00A7B5",
              fontWeight: "bold",
            }}
          >
            {userAuth?.userName.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography fontWeight={600}>{userAuth?.userName}</Typography>
            <Typography variant="body2" color="text.secondary">{userAuth?.email}</Typography>
          </Box>
          <Divider />

          <MenuItem onClick={()=>{
            navigate('/dashboard/profile')
          }}>
            <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
            Profile
          </MenuItem>
          <Divider />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;