import {
    Box,
    Stack,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Collapse,
    CircularProgress
} from "@mui/material";
import SearchBar from "../../../components/small/SearchBar";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import bgImage from "../../../assets/img/String.png";

// icon
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import ModalDeleteConfirmation from '../../../components/medium/modal/ModalDeleteConfirmation'
import useTableSubFacility from "../hooks/useTableSubFacility";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import ShowingDataInformation from "../../../components/tableComponents/ShowingDataInformation";
import PaginationTable from "../../../components/tableComponents/PaginationTable";
import StyledTableContainer from "../../../components/tableComponents/StyledTableContainer";
import StyledTableRow from "../../../components/tableComponents/StyledTableRow";
interface TableSubFacilityProps {
    fetchDatas: () => void;
    onSuccessDelete: () => void;
}
const TableSubFacility: React.FC<TableSubFacilityProps> = ({ fetchDatas, onSuccessDelete }) => {
    const {
        page,
        isCollapsed,
        open,
        dataSubFacility,
        deletedItems,
        facilities,
        isLoading,
        isLoadingFac,
        displayedData,
        urutkan,
        handleChangePage,
        toggleCollapse,
        confirmationDelete,
        handleDeleteSuccess,
        navigate,
        setOpen,
        setSort,
        rowsPerPage } = useTableSubFacility(fetchDatas, onSuccessDelete);
    return (
        <Box>
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
                        Daftar Sub Fasilitas
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

                <CustomFrameTable />

                <Box position="absolute" sx={{ top: 0, right: 0 }}>
                    <img src={bgImage} alt="bg-image" />
                </Box>

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
                                                No. Sub Fasilitas
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
                                                Nama Sub Fasilitas
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
                                                Nama Fasilitas
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
                                                        align="center"
                                                    >
                                                        {isLoadingFac ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : (facilities[index] ? facilities[index] : "Fasilitas Tidak Ditemukan")}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={[
                                                            {
                                                                color: "#292B2C",
                                                                fontSize: "14px",
                                                                textTransform: "capitalize",
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center'
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
                                                        <ModalDeleteConfirmation open={open} onClose={() => setOpen(false)} apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/subfacility`} onDeleteSuccess={handleDeleteSuccess} itemId={deletedItems} fetchData={function (): void {
                                                            throw new Error("Function not implemented.");
                                                        }} />
                                                        <Typography
                                                            mr={2}
                                                            onClick={() => navigate(`/editSubFasilitas/${data.id}`)}
                                                            sx={{
                                                                textTransform: "capitalize",
                                                                color: "#8F85F3",
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Ubah
                                                        </Typography>
                                                        <Typography
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
                                        ) : isLoading ? (
                                            <StyledTableRow>
                                                <TableCell colSpan={5} align="center">
                                                    Fetching . . .
                                                </TableCell>
                                            </StyledTableRow>
                                        ) : (
                                            <StyledTableRow>
                                                <TableCell colSpan={5} align="center">
                                                    Tidak ada data
                                                </TableCell>
                                            </StyledTableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>
                        </Box>
                        <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <ShowingDataInformation
                                length={dataSubFacility.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                            />
                            <PaginationTable
                                length={dataSubFacility.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChange={handleChangePage}
                            />

                        </Stack>
                    </Box>
                </Collapse>
            </Box>
        </Box>

    )
}


export default TableSubFacility