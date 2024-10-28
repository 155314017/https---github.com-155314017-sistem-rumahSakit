import { useState } from "react";
import * as React from 'react';
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
  Modal,
  Button,
  Pagination,
} from "@mui/material";
import SearchBar from "../../components/small/SearchBar";
import DropdownList from "../../components/small/DropdownList";
import { styled } from "@mui/material/styles";

import bgImage from "../../assets/img/String.png";
import Logo from "../../assets/img/Logo - St carolus.png";

// icon
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import DataAmbulance from "../../dummyData/dataAmbulance";
import ModalDeleteConfirmation from "../../components/small/ModalDeleteConfirmation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "24px",
  p: 4,
};

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

export default function TableAmbulance() {
  const datas = DataAmbulance;

  const [openDelete, setOpenDelete] = useState(false);
  const handleClose = () => setOpenDelete(false);

  const [page, setPage] = useState(2);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [open, setOpen] = React.useState<boolean>(false);

  const rowsPerPage = 10;

  const displayedData = datas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const sortir = [
    { value: 1, label: "Status" },
    { value: 2, label: "Status" },
    { value: 3, label: "Status" },
  ];

  const urutkan = [
    { value: 1, label: "Tarif ambulance tertinggi" },
    { value: 2, label: "Tarif ambulance  terendah" },
    { value: 3, label: "Nomor ambulance 1-9" },
    { value: 4, label: "Nomor ambulance 9-1" },
  ];

  const handleSelectionChange = (selectedValue: string) => {
    console.log("Selected Value:", selectedValue);
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
            Daftar Ambulance
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
              width: "600px",
              height: "50px",
              bgcolor: "#F1F0FE",
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

        {!isCollapsed && (
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
                onChange={handleSelectionChange}
              />
              <DropdownList
                options={urutkan}
                placeholder="Urutkan"
                onChange={handleSelectionChange}
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
                        No. Ambulance
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
                        Biaya Tarif
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
                        Jam Operasional
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
                        Status
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
                    {displayedData.map((data, index) => (
                      <StyledTableRow key={index}>
                        <TableCell
                          sx={[{ color: "#292B2C", fontSize: "14px" }]}
                          align="center"
                        >
                          {data.no_ambulance}
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
                          Rp {data.biaya_tarif},-
                        </TableCell>
                        <TableCell
                          sx={[
                            {
                              color: "#292B2C",
                              fontSize: "14px",
                              textTransform: "capitalize",
                            },
                          ]}
                          align="center"
                        >
                          {data.jam_operasional}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={[
                            {
                              color: "#292B2C",
                              fontSize: "14px",
                              display: "flex",
                              justifyContent: "center",
                            },
                          ]}
                        >
                          <Box
                            sx={{
                              bgcolor:
                                data.status === "available"
                                  ? "#d4edda"
                                  : "#f8d7da",
                              color:
                                data.status === "available"
                                  ? "#155724"
                                  : "#721c24",
                              padding: "4px 8px",
                              borderRadius: "8px",
                              textTransform: "capitalize",
                              width: "80px",
                            }}
                          >
                            {data.status}
                          </Box>
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
                            onClick={confirmationDelete}
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

                          <ModalDeleteConfirmation open={open} onClose={() => setOpen(false)} />
                          <Link
                            href="#"
                            mr={2}
                            underline="hover"
                            sx={{
                              textTransform: "capitalize",
                              color: "#8F85F3",
                            }}
                          >
                            Ubah
                          </Link>
                          <Link
                            href="#"
                            underline="hover"
                            sx={{
                              textTransform: "capitalize",
                              color: "#8F85F3",
                            }}
                          >
                            Detail
                          </Link>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>

              {/* modal delete */}
              <Modal
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{ width: "100px", marginBottom: "12px" }}
                  />
                  <Typography
                    id="modal-modal-title"
                    sx={{ fontSize: "18px", fontWeight: "700" }}
                  >
                    Apakah anda yakin ingin menghapus data ini?
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, fontSize: "16px" }}
                  >
                    Jika anda menghapus data ini, maka data yang anda hapus akan
                    hilang selamanya.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 3,
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        boxShadow: "none",
                        textTransform: "capitalize",
                        width: "100%",
                      }}
                    >
                      cancel
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        boxShadow: "none",
                        textTransform: "capitalize",
                        bgcolor: "#8F85F3",
                        color: "#fff",
                        width: "100%",
                      }}
                    >
                      hapus data
                    </Button>
                  </Box>
                </Box>
              </Modal>
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
        )}
      </Box>
    </Box>
  );
}
