import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#00A7B5",
                }}
            >
                <Stack  spacing={2} textAlign="center" sx={{width:500, backgroundColor:'white', padding:10, borderRadius:4}}>
                    <Typography variant="h2" sx={{fontWeight:600, color:'#00A7B5'}}> 403</Typography>
                    <Typography variant="h4" mt={2}>Access Denied</Typography>
                    <Typography color="text.secondary" mt={1}>You don't have permission to access this page.</Typography>
                    <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/")}
                            sx={{backgroundColor:'#00A7B5'}}
                        >
                            Go to Dashboard
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{color:'#00A7B5'}}
                            onClick={() => navigate('/login')}
                        >
                            Go Back
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}
export default UnAuthorized;