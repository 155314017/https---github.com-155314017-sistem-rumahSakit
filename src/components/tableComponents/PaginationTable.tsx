import React from "react";
import { Pagination } from "@mui/material";

interface PaginationTableProps {
    length: number;
    rowsPerPage: number;
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationTable: React.FC<PaginationTableProps> = ({
    length,
    rowsPerPage,
    page,
    onChange,
}) => {
    return (
        <Pagination
            count={Math.ceil(length / rowsPerPage)}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={onChange}
            sx={{
                "& .MuiPaginationItem-root": {
                    color: "#8F85F3",
                    border: "none",
                },
                "& .Mui-selected": {
                    backgroundColor: "#8F85F3",
                    bgcolor: "#D5D1FB",
                },
                "& .MuiPaginationItem-ellipsis": {
                    border: "none",
                },
                "& .MuiPaginationItem-text": {
                    border: "none",
                },
            }}
        />
    );
};

export default PaginationTable;
