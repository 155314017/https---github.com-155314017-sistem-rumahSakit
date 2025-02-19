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
  Pagination,
  Collapse,
} from "@mui/material";
import SearchBar from "../../../components/small/SearchBar";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";

// icon
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import bgImage from "../../../assets/img/String.png";
import ModalDeleteConfirmation from '../../../components/medium/modal/ModalDeleteConfirmation'


//hooks
import useTableRuangan from "../hooks/useTableRuangan";
import React from "react";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import { RoomDataItem } from "../../../types/room.types";
import StyledTableContainer from "../../../components/tableComponents/StyledTableContainer";
import StyledTableRow from "../../../components/tableComponents/StyledTableRow";




interface TableRuanganProps {
  data: RoomDataItem[];
  onSuccessDelete: () => void;
  setPageNumber: (page: number) => void;
  setOrderBy: (order: string) => void;
  totalElements: number;
  dataIdBuilding: string[];
  fetchData?: () => void
}

const TableRuangan: React.FC<TableRuanganProps> = ({
  data,
  onSuccessDelete,
  setPageNumber,
  setOrderBy,
  totalElements,
  dataIdBuilding,
  fetchData
}) => {
  const {
    page,
    isCollapsed,
    open,
    setOpen,
    deletedItems,
    setSort,
    buildings,
    confirmationDelete,
    handleChangePage,
    sortir,
    urutkan,
    pageSize,
    toggleCollapse,
    handleDeleteSuccess,
    navigate
  } = useTableRuangan(
    onSuccessDelete,
    setPageNumber,
    setOrderBy,
    dataIdBuilding
  );
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
                    {data.length > 0 ? (
                      data.map((item, index) => (
                        <StyledTableRow key={index}>
                          <TableCell
                            sx={[{ color: "#292B2C", fontSize: "14px" }]}
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
                            align="center"
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
                            {item.type}
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
                              onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => confirmationDelete(event, item.id)}
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
                              apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/room`}
                              onDeleteSuccess={handleDeleteSuccess}
                              itemId={deletedItems ?? ""}
                              fetchData={fetchData ?? (() => { })}
                            />
                            <Typography
                              onClick={() => navigate(`/editRuangan/${item.id}`)}
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
                              onClick={() => navigate(`/detailRuangan/${item.id}`)}
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


export default TableRuangan