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

// icon
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ModalDeleteConfirmation from '../../../components/medium/modal/ModalDeleteConfirmation'

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

//hooks
import useTableKlinik from "../hooks/useTableKlinik";
import React from "react";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import { ClinicDataItem } from "../../../types/clinic.types";

interface TableKlinikgProps {
  data: ClinicDataItem[];
  onSuccessDelete: () => void;
  setPageNumber: (page: number) => void;
  setOrderBy: (order: string) => void;
  totalElements: number;
}

const TableKlinik: React.FC<TableKlinikgProps> = ({ 
  data,
  onSuccessDelete,
  setPageNumber,
  setOrderBy,
  totalElements }) => {
  const {
    page,
    isCollapsed,
    open,
    setOpen,
    deletedItems,
    confirmationDelete,
    handleDeleteSuccess,
    handleChangePage,
    urutkan,
    toggleCollapse,
    navigate,
    setSort,
    pageSize
  } = useTableKlinik(
  onSuccessDelete,
  setPageNumber,
  setOrderBy
  );
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
            Daftar Klinik
          </Typography>
          {/* collapse button */}
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
                        width={"15%"}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#292B2C",
                          bgcolor: "#F1F0FE",
                        }}
                        align="center"
                      >
                        No. Klinik
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
                        Nama Klinik
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
                        Deskripsi
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
                      data.map((data, index) => (
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
                          >
                            {data.name}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={[{ color: "#292B2C", fontSize: "14px" }]}
                          >
                            {data.description}
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
                              onClick={(event) => confirmationDelete(event, data.id)}
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
                              apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/${deletedItems}`}
                              onDeleteSuccess={handleDeleteSuccess}
                            />
                            <Link
                              onClick={() => navigate(`/editKlinik/${data.id}`)}
                              mr={2}
                              underline="hover"
                              sx={{
                                textTransform: "capitalize",
                                color: "#8F85F3",
                                ":hover": {
                                  cursor: "pointer",
                                }
                              }}
                            >
                              Ubah
                            </Link>
                            <Link
                              onClick={() => navigate(`/detailKlinik/${data.id}`)}
                              underline="hover"
                              sx={{
                                textTransform: "capitalize",
                                color: "#8F85F3",
                                ":hover": {
                                  cursor: "pointer",
                                }
                              }}
                            >
                              Lihat selengkapnya
                            </Link>
                          </TableCell>
                        </StyledTableRow>
                      ))
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
              <Typography sx={{ color: "#A8A8BD" }}>
                Showing {data.length > 0 ? (page - 1) * pageSize + 1 : 0} to{" "}
              </Typography>
              <Pagination
                count={Math.max(Math.ceil(totalElements / pageSize))}
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
        </Collapse>
      </Box>
    </Box>
  )
}


export default TableKlinik