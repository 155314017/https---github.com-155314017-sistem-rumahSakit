import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from "@mui/material";
import SearchBar from "../../components/small/SearchBar";
import DropdownList from "../../components/small/DropdownList";
import { styled } from "@mui/material/styles";
import DataRuangan from "../../dummyData/dataRuangan";

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

export default function TableRuangan() {
  const datas = DataRuangan;
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
        border={"1px solid #A8A8BD"}
        p={3}
        height={702}
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
              maxHeight: "500px",
              border: "1px solid #A8A8BD",
              borderRadius: "16px",
            }}
          >
            <Table stickyHeader sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    width={"10%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="left"
                  >
                    No.Ruangan
                  </TableCell>
                  <TableCell
                    width={"8%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="left"
                  >
                    Nama Gedung
                  </TableCell>
                  <TableCell
                    width={"15%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="left"
                  >
                    Jenis Ruangan
                  </TableCell>
                  <TableCell
                    width={"15%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="center"
                  >
                    Kuota Ruangan
                  </TableCell>
                  <TableCell
                    width={"15%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="center"
                  >
                    Tarif Ruangan
                  </TableCell>
                  <TableCell
                    width={"20%"}
                    sx={{ fontSize: "16px", fontWeight: 700, color: "#292B2C" }}
                    align="center"
                  >
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.map((data, index) => (
                  <StyledTableRow key={index}>
                    <TableCell
                      sx={[{ color: "#292B2C", fontSize: "16px" }]}
                    >
                      {data.noRuangan}
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
                      {data.namaGedung}
                    </TableCell>
                    <TableCell
                      sx={[{ color: "#292B2C", fontSize: "16px", textTransform: "capitalize" }]}
                    >
                      {data.jenisRuangan}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={[{ color: "#292B2C", fontSize: "16px" }]}
                    >
                      {data.kuotaRuangan} / {data.kuotaRuangan}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={[{ color: "#292B2C", fontSize: "16px" }]}
                    >
                     Rp {data.tarifRuangan} ,-
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={[{ color: "#292B2C", fontSize: "16px", textTransform: "capitalize" }]}
                    >
                      <Link href="#" mr={2} underline="hover" sx={{textTransform: "capitalize", color: "#F04438"}}>Hapus</Link>
                      <Link href="#" mr={2} underline="hover" sx={{textTransform: "capitalize", color: "#8F85F3"}}>Ubah</Link>
                      <Link href="#" underline="hover" sx={{textTransform: "capitalize", color: "#8F85F3"}}>Detail</Link>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
      </Box>
    </Box>
  );
}
