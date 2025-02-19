
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
    TablePagination,
} from "@mui/material";
import SearchBar from "../SearchBar";
import DropdownList from "../dropdownlist/DropdownList";
import { styled } from "@mui/material/styles";
import bgImage from "../../../assets/img/String.png";

//hooks
import useCardIzinAkses from "../../../pages/pegawai/hooks/useCardIzinAkses";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
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

export default function CardAccessPermit() {
    const {
        datas,
        displayedData,
        sortir,
        urutkan,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage, 
    } = useCardIzinAkses();

    return (
        <Box width={'55vw'} >
            <Box
                position={"relative"}
                p={3}
                sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "700",
                            fontSize: "20px",
                        }}
                    >
                        Daftar Pegawai
                    </Typography>
                </Box>

                {/* membuat bentuk lengkung atas */}
                <Box
                    position={"absolute"}
                    sx={{
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                    }}
                >
                    {/* lengkung kiri */}
                    <Box
                        sx={{
                            width: "50px",
                            height: "30px",
                            bgcolor: "#F1F0FE",
                        }}
                    >
                        <Box
                            sx={{
                                width: "50px",
                                height: "30px",
                                bgcolor: "#fff",
                                borderRadius: "0px 15px 0px 0px ",
                            }}
                        />
                    </Box>

                    {/* kotak tengah */}
                    <Box
                        sx={{
                            width: "400px",
                            height: "50px",
                            bgcolor: "#F1F0FE",
                            // bgcolor:'red',
                            borderRadius: "0px 0px 22px 22px",
                        }}
                    />

                    {/* lengkung kanan */}
                    <Box
                        sx={{
                            width: "50px",
                            height: "30px",
                            bgcolor: "#F1F0FE",
                        }}
                    >
                        <Box
                            sx={{
                                width: "50px",
                                height: "30px",
                                bgcolor: "#fff",
                                borderRadius: "15px 0px 0px 0px ",
                            }}
                        />
                    </Box>
                </Box>
                {/* ---------- */}

                <Box position="absolute" sx={{ top: 0, right: 0 }}>
                    <img src={bgImage} alt="bg-image" />
                </Box>

                <Box>
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
                                maxHeight: "610px",
                                borderRadius: "16px",
                            }}
                        >
                            <Table stickyHeader sx={{ width: "100%" }}>
                                <TableHead>
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
                                            Menu Akses
                                        </TableCell>
                                        <TableCell
                                            width={"15%"}
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 700,
                                                color: "#292B2C",
                                                bgcolor: "#F1F0FE",
                                            }}
                                            align="center"
                                        >
                                            Detail Akses
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedData.map((data, index) => (
                                        <StyledTableRow key={index}>
                                            <TableCell
                                                sx={[{ color: "#292B2C", fontSize: "14px" }]}
                                                align="center"
                                            >
                                                {data.menuAkses}
                                            </TableCell>
                                            <TableCell
                                                align="center"
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
                                            >
                                                {data.detailAkses}
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </StyledTableContainer>
                    </Box>
                    <Stack
                        spacing={2}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Typography sx={{ color: "#8F85F3" }}>
                            Showing {page * rowsPerPage + 1} to{" "}
                            {Math.min(page * rowsPerPage + rowsPerPage, datas.length)} of{" "}
                            {datas.length} entries
                        </Typography>
                        <TablePagination
                            // shape="rounded"
                            count={datas.length}
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                color: "#8F85F3",
                                "& .MuiPaginationItem-root": {
                                    color: "#8F85F3",
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#8F85F3",
                                    color: "white",
                                },
                                "& .MuiPaginationItem-ellipsis": {
                                    color: "#8F85F3",
                                },
                            }}
                        />
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
