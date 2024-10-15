import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import PhoneInput from "react-phone-input-2";

interface Props {
    widthInput: string;
    heightInput: string;
}

export default function PhoneInputComponent({ widthInput, heightInput }: Props) {
    return (
        <Box>
            <PhoneInput
                country={'id'}
                // value={values.phone}
                // onChange={(phone) => setFieldValue('phone', phone)}
                inputStyle={{
                    height: heightInput,  // perbaikan di sini
                    borderRadius: '8px',
                    // border: `1px solid ${touched.phone && errors.phone ? 'red' : '#ccc'}`,
                    border: '1px solid #ccc',
                    // padding: '10px 40px 10px 60px',
                    fontSize: '16px',
                    width: widthInput,  // perbaikan di sini
                    // marginTop: '10px',
                }}
                buttonStyle={{
                    borderRadius: '8px 0 0 8px',
                    border: '1px solid #ccc',
                }}
                containerStyle={{
                    // marginBottom: '10px',
                    width: '100%',
                }}
            />
            {/* {touched.phone && errors.phone && (
                <Typography sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.phone}
                </Typography>
            )} */}
        </Box>
    );
}
