import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <LocalHospitalIcon sx={{ color: 'white', fontSize: '350px' }} />
      <Typography sx={{ color: 'white', fontSize: '30px', fontWeight: 'bold', fontFamily: 'monospace', lineHeight: '250px' }} >The page you are looking for is not found, try another page !</Typography>
    </Box >
  )
}
