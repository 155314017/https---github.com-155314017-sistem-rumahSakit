import React from "react";
import { Typography } from "@mui/material";

interface showingDataInformationProps {
    length: number;
    rowsPerPage: number;
    page: number;
}

const ShowingDataInformation: React.FC<showingDataInformationProps> = ({
    length,
    rowsPerPage,
    page,
}) => {
    return (
        <Typography sx={{ color: "#A8A8BD" }}>
            Showing {((page - 1) * rowsPerPage) + 1} to{" "}
            {Math.min(page * rowsPerPage, length)} of{" "}
            {length} entries
        </Typography>
    );
};

export default ShowingDataInformation;
