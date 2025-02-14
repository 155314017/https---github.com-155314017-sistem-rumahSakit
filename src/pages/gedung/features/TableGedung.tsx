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
  Pagination,
  Collapse,
} from "@mui/material";
import SearchBar from "../../../components/small/SearchBar";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import { styled } from "@mui/material/styles";
import bgImage from "../../../assets/img/String.png";
import { BuildingDataItem } from "../../../types/building.types";

// Icons
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ModalDeleteConfirmation from "../../../components/small/modal/ModalDeleteConfirmation";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
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

//hooks
import useTableGedung from "../hooks/useTableGedung";
import React from "react";
import CustomFrameTable from "../../../components/small/CustomFrameTable";

interface TableGedungProps {
  data: BuildingDataItem[];
  onSuccessDelete: () => void;
  setPageNumber: (page: number) => void;
  setOrderBy: (order: string) => void;
  totalElements: number;
  onSearchChange?: (value: string) => void;
}

const TableGedung: React.FC<TableGedungProps> = ({
  data,
  onSuccessDelete,
  setPageNumber,
  setOrderBy,
  totalElements,
  onSearchChange
}) => {
  const {
    page,
    isCollapsed,
    open,
    pageSize,
    handleChangePage,
    confirmationDelete,
    handleDeleteSuccess,
    toggleCollapse,
    urutkan,
    setSort,
    setOpen,
    navigate,
  } = useTableGedung(
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
                            apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building/${item.id}`}
                            onDeleteSuccess={handleDeleteSuccess}
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
              <Typography sx={{ color: "#A8A8BD" }}>
                Showing {data.length > 0 ? (page - 1) * pageSize + 1 : 0} to {Math.min((page) * pageSize, totalElements)} of {totalElements} entries
              </Typography>
              <Pagination
                count={Math.max(1, Math.ceil(totalElements / pageSize))}
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

export default TableGedung