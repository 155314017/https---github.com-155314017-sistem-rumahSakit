import { useEffect } from "react";
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
  IconButton,
  Collapse,
  Paper,
  CircularProgress,
} from "@mui/material";
import SearchBar from "../../../components/small/SearchBar";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import { styled } from "@mui/material/styles";
import bgImage from "../../../assets/img/String.png";
import { BuildingDataItem } from "../../../types/building.types";
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGedungContext } from "../../../contexts/gedung/gedungContext";
import { fetchBuildingsRequest, fetchBuildingsSuccess, fetchBuildingsFailure, deleteBuilding } from "../../../contexts/gedung/gedungActions";
import { Building } from "../../../services/Admin Tenant/ManageBuilding/Building";
import { deleteBuildingService } from "../../../services/Admin Tenant/ManageBuilding/DeleteBuildingService";

// Icons
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

// Components
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import PaginationTable from "../../../components/tableComponents/PaginationTable";
import ModalDeleteConfirmation from "../../../components/medium/modal/ModalDeleteConfirmation";
import ShowingDataInformation from "../../../components/tableComponents/ShowingDataInformation";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableContainer = styled(TableContainer)({
  "&::-webkit-scrollbar": {
    width: "8px"
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "10px"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#8f85f3",
    borderRadius: "10px",
    border: "2px solid #f1f1f1"
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#6c63ff",
    cursor: "pointer"
  }
});

//hooks
import useTableGedung from "../hooks/useTableGedung";

interface TableGedungProps {
  onSearchChange?: (value: string) => void;
  setPageNumber: (page: number) => void;
  setOrderBy: (order: string) => void;
}

const TableGedung = ({ 
  onSearchChange,
  setPageNumber,
  setOrderBy 
}: TableGedungProps): JSX.Element => {
  const navigate = useNavigate();
  const { state, dispatch } = useGedungContext();
  const { buildings, loading, error } = state;

  const {
    page,
    pageSize,
    handleChangePage,
    confirmationDelete,
    handleDeleteSuccess,
    open,
    setOpen,
    isCollapsed,
    toggleCollapse,
    urutkan,
    setSort
  } = useTableGedung(
    () => fetchData(),
    setPageNumber,
    setOrderBy
  );

  const fetchData = async () => {
    dispatch(fetchBuildingsRequest());
    try {
      const response = await Building(page - 1, pageSize, "createdDateTime=asc");
      if (response && response.data && response.data.content) {
        dispatch(fetchBuildingsSuccess(response.data.content));
      }
    } catch (err) {
      dispatch(fetchBuildingsFailure(err instanceof Error ? err.message : 'An error occurred'));
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBuildingService(id);
      dispatch(deleteBuilding(id));
      handleDeleteSuccess();
    } catch (err) {
      console.error("Error deleting building:", err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  return (
    <Box>
      <Box
        position={"relative"}
        p={3}
        sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ textTransform: "capitalize", fontWeight: "700", fontSize: "20px" }}>
            Daftar Gedung
          </Typography>
          <IconButton sx={{ zIndex: 1 }} onClick={toggleCollapse}>
            {isCollapsed ? (
              <ChevronRightRoundedIcon sx={{ fontSize: "30px", color: "#8F85F3" }} />
            ) : (
              <ExpandMoreRoundedIcon sx={{ fontSize: "30px", color: "#8F85F3" }} />
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
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
                gap: 55,
                '@media (max-width: 1194px)': {
                  gap: 10
                }
              }}
            >
              <SearchBar onChange={onSearchChange} />
              <DropdownList
                options={urutkan}
                placeholder="Urutkan"
                onChange={(value) => {
                  setSort(value);
                }}
                loading={false}
              />
            </Box>

            <StyledTableContainer sx={{ mt: 2, boxShadow: "none", mb: 2, maxHeight: "610px", borderRadius: "16px" }}>
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
                      No. Gedung
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
                      Nama Gedung
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
                      Alamat Gedung
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
                  {buildings.length > 0 ? (
                    buildings.map((building, index) => (
                      <StyledTableRow key={index}>
                        <TableCell
                          sx={[
                            {
                              color: "#292B2C",
                              fontSize: "14px"
                            }
                          ]}
                          align="center"
                        >
                          {(page - 1) * pageSize + index + 1}
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
                        >
                          {building.name}
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
                          align="left"
                        >{building.address}</TableCell>
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
                          <Link
                            onClick={(event) => confirmationDelete(event, building.id)}
                            href="#"
                            mr={2}
                            underline="hover"
                            sx={{
                              textTransform: "capitalize",
                              color: "#8F85F3",
                            }}
                          >
                            Hapus
                          </Link>
                          <ModalDeleteConfirmation
                            open={open}
                            onClose={() => setOpen(false)}
                            apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building/${building.id}`}
                            onDeleteSuccess={handleDeleteSuccess}
                          />
                          <Link
                            onClick={() => navigate(`/gedung/edit/${building.id}`)}
                            mr={2}
                            underline="hover"
                            sx={{
                              textTransform: "capitalize",
                              color: "#8F85F3",
                              cursor: "pointer",
                            }}
                          >
                            Ubah
                          </Link>
                          <Link
                            onClick={() => navigate(`/gedung/detail/${building.id}`)}
                            mr={2}
                            underline="hover"
                            sx={{
                              textTransform: "capitalize",
                              color: "#8F85F3",
                              cursor: "pointer",
                              textDecoration: 'none'
                            }}
                          >
                            Lihat Selengkapnya
                          </Link>
                        </TableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow>
                      <TableCell colSpan={4} align="center">Tidak ada data</TableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </StyledTableContainer>

            <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
              <ShowingDataInformation length={buildings.length} rowsPerPage={pageSize} page={page} />
              <PaginationTable length={buildings.length} rowsPerPage={pageSize} page={page} onChange={handleChangePage} />
            </Stack>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default TableGedung;