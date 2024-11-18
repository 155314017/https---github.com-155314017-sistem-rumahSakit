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

// icon
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import bgImage from "../../assets/img/String.png";
import ModalDeleteConfirmation from "../../components/small/ModalDeleteConfirmation";
import { RoomServices, RoomDataItem } from "../../services/Admin Tenant/ManageRoom/RoomServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface BuildingDataItem {
  id: string;
  name: string;
  address: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  images: string[];
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ApiResponse {
  responseCode: string;
  statusCode: string;
  message: string;
  data: {
    content: BuildingDataItem[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
}



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

interface TableRoomProps {
  fetchDatas: () => void;
  onSuccessDelete: () => void;
}

const TableRuangan: React.FC<TableRoomProps> = ({ fetchDatas, onSuccessDelete }) => {

  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  // const [data, setData] = useState<RoomDataItem[]>([]);
  const [datas, setDatas] = useState<RoomDataItem[]>([]);
  const [dataIdBuilding, setDataIdBuilding] = useState<string[]>([]);
  const [deletedItems, setDeletedItems] = useState("");

  const navigate = useNavigate();


  const fetchData = async () => {
    console.log('Fetching data...');
    try {
      const result = await RoomServices();
      console.log('Result: ', result);
      setDatas(result);
      console.log("FETCHIG DATA ID FAICILITY")
      const buildingIds = result.map((data) => data.masterBuildingId);
      setDataIdBuilding(buildingIds);

      console.log('Data ID Facility: ', buildingIds);
      // setData(result); // Set data to display in table
    } catch (error) {
      console.log('Failed to fetch data from API: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);



  const [buildings, setBuildings] = useState<string[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const responses = await Promise.all(
          dataIdBuilding.map((id) => axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/building/${id}`))
        );

        const facilitiesData = responses.map((response) => {
          const name = response.data.data.name;
          return name ? name : "Data Gedung Tidak Tercatat";
        });

        setBuildings(facilitiesData);
        console.log("DATA FASILITAS UTAMA");
        console.log(facilitiesData);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    if (dataIdBuilding.length > 0) {
      fetchBuildings();
    }
  }, [dataIdBuilding]);



  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault();
    console.log("ID Gedung yang akan dihapus:", buildingId);
    setDeletedItems(buildingId);
    setOpen(true);
  };


  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;

  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleDeleteSuccess = () => {
    console.log("Item deleted successfully");
    fetchDatas();
    fetchData();
    onSuccessDelete();
  };

  // const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>) => {
  //   event.preventDefault();
  //   setOpen(true);
  // };

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
                              },
                            ]}
                          >
                            <Link
                              href="#"
                              underline="none"
                              color={"#8F85F3"}
                              onClick={(event) => confirmationDelete(event, data.id)}
                              sx={{ mr: 2 }}
                            >
                              Hapus
                            </Link>
                            <ModalDeleteConfirmation open={open} onClose={() => setOpen(false)} apiUrl={`https://hms.3dolphinsocial.com:8083/v1/manage/room/${deletedItems}`} onDeleteSuccess={handleDeleteSuccess} />
                            <Link
                              href="#"
                              onClick={() => navigate(`/editRuangan/${data.id}`)}
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
                              onClick={() => navigate(`/detailRuangan/${data.id}`)}
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
  );
}

export default TableRuangan;