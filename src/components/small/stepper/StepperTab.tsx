import React from 'react';
import { Box, Typography } from '@mui/material';
import { getBorderStyle } from '../../../style/ts/getBorderStyle';

interface StepperTabProps {
    pageNumber: number;
    label: string;
    currentPage: number;
    onClick: (pageNumber: number) => void;
}

const StepperTab: React.FC<StepperTabProps> = ({ pageNumber, label, currentPage, onClick }) => {
    const getPageStyle = (page: number) => {
        if (page === currentPage) {
            return { color: "#8F85F3", cursor: "pointer", fontWeight: "bold" };
        } else if (page < currentPage) {
            return { color: "#8F85F3", cursor: "pointer" };
        } else {
            return { color: "black", cursor: "pointer" };
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            onClick={() => onClick(pageNumber)}
            sx={getPageStyle(pageNumber)}
            mx={2}
        >
            <Box sx={getBorderStyle(pageNumber, currentPage)}>{pageNumber}</Box>
            <Typography sx={{ ml: 1 }}>{label}</Typography>
        </Box>
    );
};

export default StepperTab;
