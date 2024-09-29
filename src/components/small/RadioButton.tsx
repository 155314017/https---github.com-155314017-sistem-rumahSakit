import { FormControlLabel, Radio } from '@mui/material'

interface Props {
    value : string;
    label : string;
}

const RadioButton: React.FC<Props> = ({ value, label }) => {
  return (
      <FormControlLabel value={value} control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }}  />} label={label} />
  )
}

export default RadioButton;
