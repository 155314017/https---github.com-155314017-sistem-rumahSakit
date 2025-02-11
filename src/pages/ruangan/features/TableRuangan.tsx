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
  IconButton,
  Pagination,
  Collapse,
} from "@mui/material";
import SearchBar from "../../../components/small/SearchBar";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import { styled } from "@mui/material/styles";

// icon
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import bgImage from "../../../assets/img/String.png";
import ModalDeleteConfirmation from "../../../components/small/modal/ModalDeleteConfirmation";


//hooks
import useTableRuangan from "../hooks/useTableRuangan";
import React from "react";
import CustomFrameTable from "../../../components/small/CustomFrameTable";


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

interface TableRuanganProps {
  fetchDatas: () => void;
  onSuccessDelete: () => void;
}

const TableRuangan: React.FC<TableRuanganProps> = ({ fetchDatas, onSuccessDelete }) => {
  const {
    page,
    isCollapsed,
    open,
    setOpen,
    roomData,
    deletedItems,
    loading,
    setSort,
    displayedData,
    buildings,
    confirmationDelete,
    handleChangePage,
    rowsPerPage,
    sortir,
    urutkan,
    toggleCollapse,
    handleDeleteSuccess,
    navigate
  } = useTableRuangan(fetchDatas, onSuccessDelete);
  return (
    <Box>
      <Box
        position="relative"
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
            Daftar Ruangan
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
                options={sortir}
                placeholder="Sortir"
                // onChange={handleSelectionChange}
                loading={false}
              />
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
                        width={"12%"}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#292B2C",
                          bgcolor: "#F1F0FE",
                        }}
                        align="center"
                      >
                        No.Ruangan
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
                        Nama Ruangan
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
                        width={"12%"}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#292B2C",
                          bgcolor: "#F1F0FE",
                        }}
                        align="left"
                      >
                        Jenis Ruangan
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
                                fontSize: "14px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "150px",
                                textTransform: "capitalize",
                              },
                            ]}
                            align="left"
                          >
                            {buildings[index]}
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
                            {data.type}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={[
                              {
                                color: "#292B2C",
                                fontSize: "14px",
                                textTransform: "capitalize",
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                              },
                            ]}
                          >
                            <Typography
                              color={"#8F85F3"}
                              onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => confirmationDelete(event, data.id)}
                              sx=
                              {{
                                mr: 2,
                                cursor: 'pointer'
                              }}
                            >
                              Hapus
                            </Typography>
                            <ModalDeleteConfirmation
                              open={open}
                              onClose={() => setOpen(false)}
                              apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/room/${deletedItems}`}
                              onDeleteSuccess={handleDeleteSuccess}
                            />
                            <Typography
                              onClick={() => navigate(`/editRuangan/${data.id}`)}
                              mr={2}
                              sx={{
                                textTransform: "capitalize",
                                color: "#8F85F3",
                                cursor: "pointer",
                              }}
                            >
                              Ubah
                            </Typography>
                            <Typography
                              onClick={() => navigate(`/detailRuangan/${data.id}`)}
                              sx={{
                                textTransform: "capitalize",
                                color: "#8F85F3",
                                cursor: "pointer",
                              }}
                            >
                              Lihat Selengkapnya
                            </Typography>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : loading ? (
                      <StyledTableRow>
                        <TableCell colSpan={5} align="center">
                          Sedang mengambil data . . .
                        </TableCell>
                      </StyledTableRow>
                    ) : (
                      <StyledTableRow>
                        <TableCell colSpan={5} align="center">
                          Tidak ada data
                        </TableCell>
                      </StyledTableRow>
                    )
                    }
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Box>
            <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography sx={{ color: "#A8A8BD" }}>
                Showing {((page - 1) * rowsPerPage) + 1} to{" "}
                {Math.min(page * rowsPerPage, roomData.length)} of{" "}
                {roomData.length} entries
              </Typography>
              <Pagination
                count={Math.ceil(roomData.length / rowsPerPage)}
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


export default TableRuangan