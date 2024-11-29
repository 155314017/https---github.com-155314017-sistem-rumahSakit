import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


// interface DropDownListPenanggungJawabProps {
//     values: {
//         relation: string;
//     };
//     setFieldValue: (field: string, value: any) => void; 
// }

// export default function DropDownListPenanggungJawab({
//     values,
//     setFieldValue,
// }: DropDownListPenanggungJawabProps) {
const DropDownListPenanggungJawab: React.FC = () => {
    return (
        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="relation-label">Hubungan</InputLabel>
            <Select
                labelId="relation-label"
                // value={values.relation}
                label="Hubungan"
                // onChange={(e) => setFieldValue('relation', e.target.value)}
                sx={{
                    width: '500px',
                    height:'44px',
                    backgroundColor: '#FAFAFA',
                    borderRadius: '8px',
                }}
            >
                <MenuItem value="anak">Anak</MenuItem>
                <MenuItem value="orang tua">Orang Tua</MenuItem>
                <MenuItem value="kerabat">Kerabat</MenuItem>
            </Select>
        </FormControl>
    );
}

export default DropDownListPenanggungJawab;
