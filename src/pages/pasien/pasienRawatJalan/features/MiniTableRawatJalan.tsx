import { Box, Stack, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link, Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import bgImage from "../../../../assets/img/String.png";
import useMiniTableRawatJalan from "../hooks/useMiniTableRawatJalan";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const StyledTableContainer = styled(TableContainer)`
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #8f85f3;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #6c63ff;
    cursor: pointer;
  }
`;

export default function MiniTableRawatJalan() {
    const { page, datas, handleChangePage, rowsPerPage, displayedData, confirmationDelete, userDataPhone } = useMiniTableRawatJalan();

    return (
        <Box>
            <Box position={"relative"} p={3} sx={{ borderRadius: "24px", bgcolor: "transparent", overflow: "hidden" }}>
                <Box>
                    <StyledTableContainer
                        sx={{
                            mt: 2,
                            boxShadow: "none",
                            mb: 2,
                            maxHeight: "350px",
                            borderRadius: "16px",
                            overflowY: "auto",
                        }}
                    >
                        <Table stickyHeader sx={{ width: "100%" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={"8%"} sx={{ lineHeight: '18px', fontSize: "16px", fontWeight: 600, color: "#292B2C", bgcolor: "#F1F0FE" }} align="center">
                                        No Antri
                                    </TableCell>
                                    <TableCell width={"8%"} sx={{ fontSize: "14px", fontWeight: 700, color: "#292B2C", bgcolor: "#F1F0FE" }} align="center">
                                        No RM
                                    </TableCell>
                                    <TableCell width={"12%"} sx={{ fontSize: "14px", fontWeight: 700, color: "#292B2C", bgcolor: "#F1F0FE" }} align="center">
                                        Nama Pasien
                                    </TableCell>
                                    <TableCell width={"20%"} sx={{ fontSize: "14px", fontWeight: 700, color: "#292B2C", bgcolor: "#F1F0FE" }} align="center">
                                        Aksi
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedData.length > 0 ? (
                                    displayedData.map((data, index) => (
                                        <StyledTableRow key={index}>
                                            <TableCell sx={{ color: "#292B2C", fontSize: "14px" }} align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    color: "#292B2C",
                                                    fontSize: "14px",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "150px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="center"
                                            >
                                                {data.name}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    color: "#292B2C",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "150px",
                                                    fontSize: "14px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="center"
                                            >
                                                {data.gender}
                                            </TableCell>
                                            <TableCell align="center" sx={{ color: "#292B2C", fontSize: "14px", textTransform: "capitalize" }}>
                                                <Link href="#" underline="none" color={"#8F85F3"} onClick={confirmationDelete} sx={{ mr: 2 }}>
                                                    Panggil
                                                </Link>
                                                <Link href="#" mr={2} underline="hover" sx={{ textTransform: "capitalize", color: "#8F85F3" }}>
                                                    Lihat Detail
                                                </Link>
                                                <Link href="/detailGedung" underline="hover" sx={{ textTransform: "capitalize", color: "#8F85F3" }}>
                                                    :
                                                </Link>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))
                                ) : (
                                    <StyledTableRow>
                                        <TableCell colSpan={11} align="center">
                                            Tidak ada data
                                        </TableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                </Box>

                {/* <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography sx={{ color: "#A8A8BD" }}>
                        Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, datas.length)} of {datas.length} entries
                    </Typography>
                    <Pagination
                        count={Math.ceil(datas.length / rowsPerPage)}
                        variant="outlined"
                        shape="rounded"
                        page={page}
                        onChange={handleChangePage}
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
                        }}
                    />
                </Stack> */}
            </Box>
        </Box>
    );
}
