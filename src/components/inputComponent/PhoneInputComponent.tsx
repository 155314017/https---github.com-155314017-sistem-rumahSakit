import { Box } from "@mui/system";
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
                inputStyle={{
                    height: heightInput,
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    width: widthInput,
                }}
                buttonStyle={{
                    borderRadius: '8px 0 0 8px',
                    border: '1px solid #ccc',
                }}
                containerStyle={{
                    width: '100%',
                }}
            />
        </Box>
    );
}
