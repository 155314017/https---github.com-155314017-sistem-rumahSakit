import { useState } from "react";
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
  TablePagination,
} from "@mui/material";
import SearchBar from "../../components/small/SearchBar";
import DropdownList from "../../components/small/DropdownList";
import { styled } from "@mui/material/styles";
import DataRuangan from "../../dummyData/dataRuangan";

import bgImage from "../../assets/img/String.png";

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

export default function TableRuangan() {
  const datas = DataRuangan;

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedData = datas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const sortir = [
    { value: 1, label: "Nama Gedung" },
    { value: 2, label: "Jenis Ruangan" },
    { value: 3, label: "Kuota ruangan tersedia" },
    { value: 4, label: "Kuota ruangan penuh" },
  ];

  const urutkan = [
    { value: 1, label: "Nama Gedung A-Z" },
    { value: 2, label: "Nama Gedung Z-A" },
    { value: 3, label: "Tarif ruangan tertinggi" },
    { value: 4, label: "Tarif ruangan terendah" },
    { value: 5, label: "Nomor ruangan 1-9" },
    { value: 6, label: "Nomor ruangan 9-1" },
  ];

  const handleSelectionChange = (selectedValue: string) => {
    console.log("Selected Value:", selectedValue);
  };

  return (
    <Box>
      <Box
        position="relative"
        p={3}
        height={800}
        sx={{ borderRadius: "24px", bgcolor: "#fff" }}
      >
        <Typography
          sx={{
            textTransform: "capitalize",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          Daftar Ruangan
        </Typography>

        <Box position="absolute" sx={{ top: 0, right: 0 }}>
          <img src={bgImage} alt="bg-image" />
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
                    width={"12%"}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#292B2C",
                      bgcolor: "#F1F0FE",
                    }}
                    align="center"
                  >
                    Kuota Ruangan
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
                    Tarif Ruangan
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
                    <TableCell sx={[{ color: "#292B2C", fontSize: "16px" }]} align="center">
                      {data.noRuangan}
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
                      {data.namaGedung}
                    </TableCell>
                    <TableCell
                      sx={[
                        {
                          color: "#292B2C",
                          fontSize: "14px",
                          textTransform: "capitalize",
                        },
                      ]}
                    >
                      {data.jenisRuangan}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={[{ color: "#292B2C", fontSize: "14px" }]}
                    >
                      {data.kuotaRuangan} / {data.kuotaRuangan}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={[{ color: "#292B2C", fontSize: "14px" }]}
                    >
                      Rp {data.tarifRuangan} ,-
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
                        href="#"
                        mr={2}
                        underline="hover"
                        sx={{ textTransform: "capitalize", color: "#F04438" }}
                      >
                        Hapus
                      </Link>
                      <Link
                        href="#"
                        mr={2}
                        underline="hover"
                        sx={{ textTransform: "capitalize", color: "#8F85F3" }}
                      >
                        Ubah
                      </Link>
                      <Link
                        href="#"
                        underline="hover"
                        sx={{ textTransform: "capitalize", color: "#8F85F3" }}
                      >
                        Detail
                      </Link>
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
  );
}
