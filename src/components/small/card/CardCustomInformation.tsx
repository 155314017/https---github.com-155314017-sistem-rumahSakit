import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface CardCustomInformationProps {
    bgcolor?: string;
    borderColor?: string;
    teks?: string;
}

const CardCustomInformation: React.FC<CardCustomInformationProps> = ({ bgcolor = '#F1F0FE', borderColor = '#8F85F3', teks }) => {
    return (
        <>
            <ErrorOutlineOutlinedIcon />
            <Box
                sx={{
                    backgroundColor: bgcolor,
                    border: `2px solid ${borderColor}`,
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                {teks && <Typography variant="body1">{teks}</Typography>}
            </Box>
        </>
    );
}

export default CardCustomInformation;
