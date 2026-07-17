import { Card, CardContent, Typography } from "@mui/material";

const CardCompo = ({ title, description, Icon }) => {
    return (
        <>
            <Card sx={{ flex: 1 }}>
                <CardContent sx={{ textAlign: "center" }}>
                    <Icon color="primary"sx={{fontSize: 55,color:'#00A7B5'}}/>
                    <Typography variant="h6" mt={2}>{title}</Typography>
                    <Typography color="text.secondary">{description}</Typography>
                </CardContent>
            </Card>
        </>
    )
}
export default CardCompo;