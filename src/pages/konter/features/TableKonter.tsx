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
    Pagination,
    IconButton,
    Collapse,
} from "@mui/material";
import SearchBar from "../../../components/small/SearchBar";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import { styled } from "@mui/material/styles";
import bgImage from "../../../assets/img/String.png";
// icon
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ModalDeleteConfirmation from "../../../components/small/modal/ModalDeleteConfirmation";

//hooks
import useTableKonter from "../hooks/useTableKonter";
import CustomFrameTable from "../../../components/small/CustomFrameTable";

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
interface TableKonterProps {
    fetchDatas: () => void;
    onSuccessDelete: () => void;
}
const TableKonter: React.FC<TableKonterProps> = ({ fetchDatas, onSuccessDelete }) => {
    const {
        page,
        isCollapsed,
        open,
        setOpen,
        dataCounter,
        deletedItems,
        navigate,
        handleChangePage,
        rowsPerPage,
        displayedData,
        urutkan,
        toggleCollapse,
        confirmationDelete,
        setSort,
        handleDeleteSuccess
    } = useTableKonter(fetchDatas, onSuccessDelete);
    return (
        <Box>
            <Box
                position={"relative"}
                p={3}
                sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "700",
                            fontSize: "20px",
                        }}
                    >
                        Daftar Konter
                    </Typography>

                    {/* collapse button */}
                    <IconButton sx={{ zIndex: 1 }} onClick={toggleCollapse}>
                        {isCollapsed ? (
                            <ChevronRightRoundedIcon
                                sx={{ fontSize: "30px", color: "#8F85F3" }}
                            />
                        ) : (
                            <ExpandMoreRoundedIcon
                                sx={{ fontSize: "30px", color: "#8F85F3" }}
                            />
                        )}
                    </IconButton>
                </Box>

                <Box position="absolute" sx={{ top: 0, right: 0 }}>
                    <img src={bgImage} alt="bg-image" />
                </Box>

                <CustomFrameTable />

                <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
                    <Box>
                        <Box
                            mt={3}
                            display={"flex"}
                            justifyContent={"space-between"}
                            sx={{ gap: 3 }}
                        >
                            <SearchBar />
                            <DropdownList
                                options={urutkan}
                                placeholder="Urutkan"
                                onChange={(value) => setSort(value)}
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
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
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
                                                No. Konter
                                            </TableCell>
                                            <TableCell
                                                width={"15%"}
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#292B2C",
                                                    bgcolor: "#F1F0FE",
                                                }}
                                                align="left"
                                            >
                                                Nama Konter
                                            </TableCell>
                                            <TableCell
                                                width={"15%"}
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#292B2C",
                                                    bgcolor: "#F1F0FE",
                                                }}
                                                align="left"
                                            >
                                                Lokasi Konter
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
                                                        {index + 1}
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
                                                        align="left"
                                                    >
                                                        {data.name}
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
                                                        align="left"
                                                    >
                                                        {data.location}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={[
                                                            {
                                                                color: "#292B2C",
                                                                fontSize: "14px",
                                                                textTransform: "capitalize",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                            },
                                                        ]}
                                                    >
                                                        <Typography
                                                            color={"#8F85F3"}
                                                            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => confirmationDelete(event, data.id)}
                                                            sx={{ mr: 2, cursor: 'pointer' }}
                                                        >
                                                            Hapus
                                                        </Typography>
                                                        <ModalDeleteConfirmation open={open} onClose={() => setOpen(false)} apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/counter/${deletedItems}`} onDeleteSuccess={handleDeleteSuccess} />
                                                        <Typography
                                                            mr={2}
                                                            onClick={() => navigate(`/editKonter/${data.id}`)}
                                                            sx={{
                                                                textTransform: "capitalize",
                                                                color: "#8F85F3",
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Ubah
                                                        </Typography>
                                                        <Typography
                                                            onClick={() => navigate(`/detailKonter/${data.id}`)}
                                                            sx={{
                                                                textTransform: "capitalize",
                                                                color: "#8F85F3",
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Lihat Selengkapnya
                                                        </Typography>
                                                    </TableCell>
                                                </StyledTableRow>
                                            ))
                                        ) : (
                                            <StyledTableRow>
                                                <TableCell colSpan={6} align="center">
                                                    Tidak ada data
                                                </TableCell>
                                            </StyledTableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>
                        </Box>

                        <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                            <Typography sx={{ color: "#A8A8BD" }}>
                                Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, dataCounter.length)} of {dataCounter.length} entries
                            </Typography>
                            <Pagination
                                count={Math.ceil(dataCounter.length / rowsPerPage)}
                                shape="rounded"
                                page={page}
                                onChange={handleChangePage}
                                sx={{
                                    "& .MuiPaginationItem-root": { color: "#8F85F3" },
                                    "& .Mui-selected": { bgcolor: "#D5D1FB" },
                                }}
                            />
                        </Stack>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    )
}


export default TableKonter