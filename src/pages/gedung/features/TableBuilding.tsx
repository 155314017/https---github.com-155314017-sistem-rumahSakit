import {
  Box,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  IconButton,
  Collapse,
} from "@mui/material";
import SearchBar from "../../../components/small/SearchBar";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import bgImage from "../../../assets/img/String.png";
import { BuildingDataItem } from "../../../types/building.types";

// Icons
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";



//hooks
import useTableBuilding from "../hooks/useTableBuilding";
import React from "react";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import PaginationTable from "../../../components/tableComponents/PaginationTable";
import ModalDeleteConfirmation from "../../../components/medium/modal/ModalDeleteConfirmation";
import ShowingDataInformation from "../../../components/tableComponents/ShowingDataInformation";
import StyledTableContainer from "../../../components/tableComponents/StyledTableContainer";
import StyledTableRow from "../../../components/tableComponents/StyledTableRow";

interface TableBuildingProps {
  data: BuildingDataItem[];
  onSuccessDelete: () => void;
  setPageNumber: (page: number) => void;
  setOrderBy: (order: string) => void;
  totalElements: number;
  onSearchChange?: (value: string) => void;
  fetchData?: () => void
}

const TableBuilding: React.FC<TableBuildingProps> = ({
  data,
  onSuccessDelete,
  setPageNumber,
  setOrderBy,
  totalElements,
  onSearchChange,
  fetchData
}) => {
  const {
    page,
    isCollapsed,
    open,
    pageSize,
    handleChangePage,
    handleDeleteSuccess,
    toggleCollapse,
    urutkan,
    setSort,
    setOpen,
    navigate,
    confirmationDelete,
    deletedItems,
  } = useTableBuilding(
    onSuccessDelete,
    setPageNumber,
    setOrderBy,

  );

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
                  console.log(value)
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
                  {data.length > 0 ? (
                    data.map((item, index) => (
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
                          {item.name}
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
                        >{item.address}</TableCell>
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
                            onClick={(event) => confirmationDelete(event, item.id)}
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
                            apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building`}
                            onDeleteSuccess={handleDeleteSuccess}
                            itemId={deletedItems ?? ""}
                            fetchData={fetchData ?? (() => { })}

                          />
                          <Link
                            onClick={() => navigate(`/editGedung/${item.id}`)}
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
                            onClick={() => navigate(`/detailGedung/${item.id}`)}
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
              <ShowingDataInformation length={totalElements} rowsPerPage={pageSize} page={page} />
              <PaginationTable length={totalElements} rowsPerPage={pageSize} page={page} onChange={handleChangePage} />
            </Stack>
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default TableBuilding