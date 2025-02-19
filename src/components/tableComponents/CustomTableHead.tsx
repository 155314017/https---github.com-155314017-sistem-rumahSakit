import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';


interface Column {
    width?: string;
    align?: 'left' | 'right' | 'center'; 
    label: React.ReactNode;
}

interface CustomTableHeadProps {
    columns: Column[];  
}

const CustomTableHead: React.FC<CustomTableHeadProps> = ({ columns }) => {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column, index) => (
                    <TableCell
                        key={index}
                        width={column.width || 'auto'}
                        sx={{
                            fontSize: '14px',
                            fontWeight: 700,
                            color: '#292B2C',
                            bgcolor: '#F1F0FE',
                            textAlign: column.align || 'left',
                        }}
                        align={column.align || 'left'}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default CustomTableHead;
