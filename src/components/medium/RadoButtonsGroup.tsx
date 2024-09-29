import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface RadioButtonsGroupProps {
    selectedValue: string;  
    onChange: (value: string) => void;  
    widthInput: string;
    heightInput: string;

}

const RadioButtonsGroup: React.FC<RadioButtonsGroupProps> = ({ selectedValue, onChange, widthInput, heightInput }) => {
    return (
            <FormControl sx={{ width: widthInput, height: heightInput }}>
            <FormLabel sx={{ fontSize: '16px', lineHeight: '18px', marginBottom: '15px', color: 'black' }}>
                Cara datang/pengantar
            </FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={selectedValue} 
                onChange={(event) => onChange(event.target.value)} 
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    border: "1px solid #A8A8BD",
                    borderRadius: "16px",
                    padding: "16px 24px",
                }}
            >
                <FormControlLabel value="sendiri" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Sendiri" />
                <FormControlLabel value="keluarga" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Keluarga" />
                <FormControlLabel value="polisi" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Polisi" />
                <FormControlLabel value="ambulan" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Ambulan" />
                <FormControlLabel value="lainnya" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Lainnya" />
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonsGroup;
