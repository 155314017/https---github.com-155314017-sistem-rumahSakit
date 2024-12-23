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
import SearchBar from "../../../components/small/SearchBar";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import { styled } from "@mui/material/styles";

import ButtonCustom from "../../../components/small/ButtonCustom";

//hooks
import useTableAntrianPasien from "../hooks/useTableAntrianPasien";

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
      background-color: #8F85F3;
      border-radius: 10px;
      border: 2px solid #f1f1f1;
    }
  
    ::-webkit-scrollbar-thumb:hover {
      background-color: #6c63ff;
      cursor: pointer;
    }
  `;

export default function TableAntrianPasien() {
  const {
    datas,
    displayedData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    sortir,
    urutkan,
    handleSelectionChange
  } = useTableAntrianPasien();

  return (
    <Box>
      <Box
        border={"1px solid #A8A8BD"}
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
          Antrian Pasien
        </Typography>

        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={"24px"}
          justifyContent={"space-between"}
          mt={"25px"}
        >
          <ButtonCustom text="Antrian (3)" />
          <ButtonCustom text="Diproses (1)" />
          <ButtonCustom text="Perlu Tindakan Lanjut (1)" />
          <ButtonCustom text="Selesai (1)" />
        </Box>


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
            loading={false}
          />
          <DropdownList
            options={urutkan}
            placeholder="Urutkan"
            onChange={handleSelectionChange}
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
              border: "1px solid #A8A8BD",
              borderRadius: "16px",
            }}
          >
            <Table stickyHeader sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    width={"12%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="left"
                  >
                    Jenis Kunjungan
                  </TableCell>
                  <TableCell
                    width={"15%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="left"
                  >
                    Keluhan
                  </TableCell>
                  <TableCell
                    width={"12%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="left"
                  >
                    Nama Pasien
                  </TableCell>
                  <TableCell
                    width={"12%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="center"
                  >
                    Nama Pj Pasien
                  </TableCell>
                  <TableCell
                    width={"15%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="center"
                  >
                    Tanggal Masuk
                  </TableCell>
                  <TableCell
                    width={"15%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
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
                      sx={[{ color: "#292B2C", fontSize: "16px" }]}
                    >
                      {data.nip}
                    </TableCell>
                    <TableCell
                      sx={[
                        {
                          color: "#292B2C",
                          fontSize: "16px",
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
                      sx={[{ color: "#292B2C", fontSize: "16px", textTransform: "capitalize" }]}
                    >
                      {data.role}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={[{ color: "#292B2C", fontSize: "16px" }]}
                    >
                      {data.menuAkses}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={[{ color: "#292B2C", fontSize: "16px" }]}
                    >
                      {data.detailAkses}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={[{ color: "#292B2C", fontSize: "16px", textTransform: "capitalize" }]}
                    >
                      <Link href="#" underline="hover" sx={{ textTransform: "capitalize", color: "#8F85F3" }}>Lihat Detail</Link>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
        <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography sx={{ color: "#8F85F3" }}>
            Showing {page * rowsPerPage + 1} to {Math.min(page * rowsPerPage + rowsPerPage, datas.length)} of {datas.length} entries
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
              }
            }}
          />
        </Stack>
      </Box>
    </Box>
  )
}
