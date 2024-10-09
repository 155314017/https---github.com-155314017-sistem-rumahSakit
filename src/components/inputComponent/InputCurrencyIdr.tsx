import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

export default function InputCurrencyIdr() {

    return (
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <FormControl fullWidth variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-amount"
                    placeholder='Cth:200.000'
                    startAdornment={<InputAdornment position="start" sx={{ display:'flex', justifyContent:'center' ,height:"120%", width:"60px" }}>Rp</InputAdornment>}
                    sx={{
                        height: '44px',
                        bgcolor:'#EEEEF2',
                        '.MuiOutlinedInput-input': {
                            padding: '10px',
                            bgcolor:'white'
                        },
                    }}
                />
            </FormControl>
        </Box>
    );
}
