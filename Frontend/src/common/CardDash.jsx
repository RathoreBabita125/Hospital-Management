import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

const CardComponent = ({ title, count, icon }) => {
    return (
        <Card
            sx={{
                width: 300,
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
                direction: 'flex',
                justifyItems: 'center',
                alignItems: 'center'
            }}
        >
            <CardContent sx={{}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{fontSize:20, fontWeight:600}}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            bgcolor: "#E3F2FD",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {icon}
                    </Box>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mt={1}
                    >
                        {count}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
export default CardComponent;