import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingCompo = () => {
    return (
        <>
            <Box className='loader-compo'  sx={{position:'fixed', top:"50%", left:"50%", zIndex:9999}}>
                <CircularProgress  />
            </Box>
        </>
    )
}
export default LoadingCompo;
