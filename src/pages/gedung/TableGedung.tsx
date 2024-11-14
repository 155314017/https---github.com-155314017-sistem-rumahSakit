import React, { useState, useEffect } from "react";
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
import SearchBar from "../../components/small/SearchBar";
import DropdownList from "../../components/small/DropdownList";
import { styled } from "@mui/material/styles";
import bgImage from "../../assets/img/String.png";

// Icons
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ModalDeleteConfirmation from "../../components/small/ModalDeleteConfirmation";
import { Building, BuildingDataItem } from "../../services/Admin Tenant/ManageBuilding/Building";
import { useNavigate } from "react-router-dom";

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

interface TableGedungProps {
  fetchDatas: () => void;
  onSuccessDelete: () => void;
}

const TableGedung: React.FC<TableGedungProps> = ({ fetchDatas, onSuccessDelete }) => {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const [datas, setDatas] = useState<BuildingDataItem[]>([]);
  const [deletedItems, setDeletedItems] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await Building();
      setDatas(result);
    } catch (error) {
      console.log("Failed to fetch data from API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault();
    setDeletedItems(buildingId);
    setOpen(true);
  };

  const rowsPerPage = 10;
  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const urutkan = [
    { value: 1, label: "Nama Gedung A-Z" },
    { value: 2, label: "Nama Gedung Z-A" },
    { value: 3, label: "Nomor Gedung 1-9" },
    { value: 4, label: "Nomor Gedung 9-1" },
  ];

  const handleDeleteSuccess = () => {
    setOpen(false);
    onSuccessDelete();
    fetchData();
    fetchDatas();
  };

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

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

        <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
          <Box>
            <Box mt={3} display={"flex"} justifyContent={"space-between"} sx={{ gap: 3 }}>
              <SearchBar />
              <DropdownList
                options={urutkan}
                placeholder="Urutkan"
                onChange={(value) => console.log("Selected Value:", value)}
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
                  {displayedData.length > 0 ? (
                    displayedData.map((data, index) => (
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
                          {(page - 1) * rowsPerPage + index + 1}
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
                        >{data.address}</TableCell>
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
                            apiUrl={`https://hms.3dolphinsocial.com:8083/v1/manage/building/${deletedItems}`}
                            onDeleteSuccess={handleDeleteSuccess}
                          />
                          <Link
                            onClick={() => navigate(`/editGedung/${data.id}`)}
                            mr={2}
                            href="#"
                            underline="hover"
                            sx={{
                              textTransform: "capitalize",
                              color: "#8F85F3",
                            }}
                          >
                            Ubah
                          </Link>
                          <Link
                            href="/detailGedung"
                            mr={2}
                            underline="hover"
                            sx={{
                              textTransform: "capitalize",
                              color: "#8F85F3",
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
                Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, datas.length)} of {datas.length} entries
              </Typography>
              <Pagination
                count={Math.ceil(datas.length / rowsPerPage)}
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
  );
};

export default TableGedung;
