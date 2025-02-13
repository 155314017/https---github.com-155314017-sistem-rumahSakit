import {
    Box,
    Stack,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Link,
    Pagination,
} from "@mui/material";
import SearchBar from "../../../../components/small/SearchBar";
import DropdownList from "../../../../components/small/dropdownlist/DropdownList";
import { styled } from "@mui/material/styles";
// icon
import useTableRiwayatKunjungan from "../hooks/useTableRiwayatKunjungan";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

// const StyledTableContainer = styled(TableContainer)`
//   ::-webkit-scrollbar {
//     display: none;
//   }

//   scrollbar-width: none;

//   overflow: auto;
// `;

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

//hooks


export default function TableRiwayatKunjungan() {
    const {
        page,
        datas,
        handleChangePage,
        rowsPerPage,
        displayedData,
        sortir,
        urutkan,
    } = useTableRiwayatKunjungan();
    return (
        <Box>
            <Box
                position={"relative"}
                p={3}
                sx={{ borderRadius: "24px", overflow: "hidden", width: '98%' }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection={'row'}>
                    {/* <Typography
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "700",
                            fontSize: "20px",
                        }}
                    >
                        Riwayat Kunjungan
                    </Typography> */}

                    <Box width={'100%'} >
                        <Box
                            mt={3}
                            display={"flex"}
                            justifyContent={"space-between"}
                            sx={{ gap: 3 }}
                        >
                            <SearchBar />
                            <DropdownList
                                options={sortir}
                                placeholder="Sortir"
                                // onChange={handleSelectionChange}
                                loading={false}
                            />
                            <DropdownList
                                options={urutkan}
                                placeholder="Urutkan"
                                // onChange={handleSelectionChange}
                                loading={false}
                            />
                        </Box>

                        <Box mt={3}>
                            <StyledTableContainer
                                sx={{
                                    mt: 2,
                                    boxShadow: "none",
                                    mb: 2,
                                    maxHeight: "fit-content",
                                    borderRadius: "16px",
                                }}
                            >
                                <Table stickyHeader sx={{ width: "100%" }}>
                                    <TableHead >
                                        <TableRow>
                                            <TableCell
                                                width={"10%"}
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#292B2C",
                                                    bgcolor: "#F1F0FE",
                                                }}
                                                align="center"
                                            >
                                                Tanggal Masuk
                                            </TableCell>
                                            <TableCell
                                                width={"10%"}
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#292B2C",
                                                    bgcolor: "#F1F0FE",
                                                }}
                                                align="center"
                                            >
                                                Tanggal Keluar
                                            </TableCell>
                                            <TableCell
                                                width={"12%"}
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#292B2C",
                                                    bgcolor: "#F1F0FE",
                                                }}
                                                align="center"
                                            >
                                                Jenis Kunjungan
                                            </TableCell>
                                            <TableCell
                                                width={"10%"}
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#292B2C",
                                                    bgcolor: "#F1F0FE",
                                                }}
                                                align="center"
                                            >
                                                Keluhan
                                            </TableCell>
                                            <TableCell
                                                width={"10%"}
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#292B2C",
                                                    bgcolor: "#F1F0FE",
                                                }}
                                                align="center"
                                            >
                                                Jenis Poli
                                            </TableCell>
                                            <TableCell
                                                width={"10%"}
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#292B2C",
                                                    bgcolor: "#F1F0FE",
                                                }}
                                                align="center"
                                            >
                                                Diagnosa
                                            </TableCell>
                                            <TableCell
                                                width={"10%"}
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#292B2C",
                                                    bgcolor: "#F1F0FE",
                                                }}
                                                align="center"
                                            >
                                                Pembayaran
                                            </TableCell>
                                            <TableCell
                                                width={"20%"}
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#292B2C",
                                                    bgcolor: "#F1F0FE",
                                                }}
                                                align="center"
                                            >
                                                Aksi
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayedData.length > 0 ? (
                                            displayedData.map((data, index) => (
                                                <StyledTableRow key={index}>
                                                    <TableCell
                                                        sx={[{ color: "#292B2C", fontSize: "14px" }]}
                                                        align="center"
                                                    >
                                                        {data.tanggalMasuk}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={[
                                                            {
                                                                color: "#292B2C",
                                                                fontSize: "14px",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                                maxWidth: "150px",
                                                                textTransform: "capitalize",
                                                            },
                                                        ]}
                                                        align="center"
                                                    >
                                                        {data.tanggalKeluar}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={[
                                                            {
                                                                color: "#292B2C",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                                maxWidth: "150px",
                                                                fontSize: "14px",
                                                                textTransform: "capitalize",
                                                            },
                                                        ]}
                                                        align="center"
                                                    >
                                                        {data.jenisKunjungan}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={[
                                                            {
                                                                color: "#292B2C",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                                maxWidth: "150px",
                                                                fontSize: "14px",
                                                                textTransform: "capitalize",
                                                            },
                                                        ]}
                                                        align="center"
                                                    >
                                                        {data.keluhan}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={[
                                                            {
                                                                color: "#292B2C",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                                maxWidth: "150px",
                                                                fontSize: "14px",
                                                                textTransform: "capitalize",
                                                            },
                                                        ]}
                                                        align="center"
                                                    >
                                                        {data.jenisPoli}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={[
                                                            {
                                                                color: "#292B2C",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                                maxWidth: "150px",
                                                                fontSize: "14px",
                                                                textTransform: "capitalize",
                                                            },
                                                        ]}
                                                        align="center"
                                                    >
                                                        {data.diagnosa}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={[
                                                            {
                                                                color: "#292B2C",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                                maxWidth: "150px",
                                                                fontSize: "14px",
                                                                textTransform: "capitalize",
                                                            },
                                                        ]}
                                                        align="center"
                                                    >
                                                        {data.pembayaran}
                                                    </TableCell>

                                                    <TableCell
                                                        align="center"
                                                        sx={[
                                                            {
                                                                color: "#292B2C",
                                                                fontSize: "14px",
                                                                textTransform: "capitalize",
                                                            },
                                                        ]}
                                                    >
                                                        <Link
                                                            href="/detailGedung "
                                                            underline="hover"
                                                            sx={{
                                                                textTransform: "capitalize",
                                                                color: "#8F85F3",
                                                            }}
                                                        >
                                                            Lihat Selengkapnya
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
                        <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography sx={{ color: "#A8A8BD" }}>
                                Showing {((page - 1) * rowsPerPage) + 1} to{" "}
                                {Math.min(page * rowsPerPage, datas.length)} of{" "}
                                {datas.length} entries
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
                                        border: 'none',
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: "#8F85F3",
                                        bgcolor: '#D5D1FB',
                                    },
                                    "& .MuiPaginationItem-ellipsis": {
                                        border: 'none',
                                    },
                                    "& .MuiPaginationItem-text": {
                                        border: 'none',
                                    },
                                }}
                            />

                        </Stack>
                    </Box>
                </Box >
            </Box >
        </Box >
    );
}
