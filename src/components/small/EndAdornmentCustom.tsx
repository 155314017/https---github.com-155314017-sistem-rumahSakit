import React from 'react';
import { Typography } from '@mui/material';

interface EndAdornmentCustomProps {
    text: string;
}

const EndAdornmentCustom: React.FC<EndAdornmentCustomProps> = ({ text }) => {
    return (
        <Typography
            sx={{
                color: "black",
                bgcolor: '#EEEEF2',
                paddingRight: '8px',
                minHeight: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                position: 'absolute',
                border: '1px solid #A8A8BD',
                right: 0,
                top: 0,
                bottom: 0,
                width: 'fit-content',
                px: 1,
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px',
            }}
        >
            {text}
        </Typography>
    );
};

export default EndAdornmentCustom;
