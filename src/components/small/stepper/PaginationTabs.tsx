import React from 'react';
import { Box } from '@mui/material';
import StepperTab from './StepperTab';

interface PaginationTabsProps {
    tabs: { pageNumber: number, label: string }[];
    setCurrentPage: (page: number) => void; 
    currentPage: number;
}

const PaginationTabs: React.FC<PaginationTabsProps> = ({ tabs, setCurrentPage, currentPage }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, justifyContent: 'space-between', ml: 2 }}>
            {tabs.map(tab => (
                <StepperTab
                    key={tab.pageNumber}
                    pageNumber={tab.pageNumber}
                    label={tab.label}
                    currentPage={currentPage}
                    onClick={setCurrentPage} 
                />
            ))}
        </Box>
    );
};

export default PaginationTabs;
