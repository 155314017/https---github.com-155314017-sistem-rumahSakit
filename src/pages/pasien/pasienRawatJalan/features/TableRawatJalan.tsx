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
    Collapse,
    Button,
    MenuItem,
    Menu,
} from "@mui/material";
import SearchBar from "../../../../components/small/SearchBar";
import DropdownList from "../../../../components/small/dropdownlist/DropdownList";
import { styled } from "@mui/material/styles";
import bgImage from "../../../../assets/img/String.png";
// icon
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import useTableRawatJalan from "../hooks/useTableRawatJalan";
import BadgeStatusPasien from "../components/BadgeStatusPasien";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AlertSuccess from "../../../../components/small/alert/AlertSuccess";
import PaginationTable from "../../../../components/tableComponents/PaginationTable";
import ShowingDataInformation from "../../../../components/tableComponents/ShowingDataInformation";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

// const StyledTableContainer = styled(TableContainer)`
//   ::-webkit-scrollbar {
//     display: none;
//   }

//   scrollbar-width: none;

//   overflow: auto;
// `;

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


export default function TableRawatJalan() {
    const {
        page,
        isCollapsed,
        datas,
        handleChangePage,
        rowsPerPage,
        displayedData,
        sortir,
        urutkan,
        toggleCollapse,
        countDownPanggil,
        getButtonStyle,
        handleButtonClick,
        countdowns,
        selected,
        anchorEl,
        handleMenuClick,
        handleMenuClose,
        alertPanggil
    } = useTableRawatJalan();
    return (
        <>
            <Box>
                {alertPanggil && (
                    <AlertSuccess label="Pasien sedang dipanggil" />
                )}
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
                            Daftar Pasien Rawat Jalan
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

                    <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
                        <Box>
                            <Box mt={3} display={"flex"} justifyContent={"space-between"} width={"100%"}>
                                <Button
                                    sx={getButtonStyle('Antrian', '12%')}
                                    onClick={() => handleButtonClick('Antrian')}
                                >
                                    Antrian (10)
                                </Button>
                                <Button
                                    sx={getButtonStyle('Tensi', '12%')}
                                    onClick={() => handleButtonClick('Tensi')}
                                >
                                    Tensi (10)
                                </Button>
                                <Button
                                    sx={getButtonStyle('SiapDiperiksa', '22%')}
                                    onClick={() => handleButtonClick('SiapDiperiksa')}
                                >
                                    Siap diperiksa dokter (10)
                                </Button>
                                <Button
                                    sx={getButtonStyle('SedangDiperiksa', '22%')}
                                    onClick={() => handleButtonClick('SedangDiperiksa')}
                                >
                                    Sedang diperiksa dokter (10)
                                </Button>
                                <Button
                                    sx={getButtonStyle('PerluTindakan', '22%')}
                                    onClick={() => handleButtonClick('PerluTindakan')}
                                >
                                    Perlu tindakan lanjutan (10)
                                </Button>
                                <Button
                                    sx={getButtonStyle('Selesai', '12%')}
                                    onClick={() => handleButtonClick('Selesai')}
                                >
                                    Selesai (10)
                                </Button>
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
                                    // onChange={handleSelectionChange}
                                    loading={false}
                                />
                                <DropdownList
                                    options={urutkan}
                                    placeholder="Urutkan"
                                    // onChange={handleSelectionChange}
                                    loading={false}
                                />
                            </Box>

                            <Box mt={3}>
                                <StyledTableContainer
                                    sx={{
                                        mt: 2,
                                        boxShadow: "none",
                                        mb: 2,
                                        maxHeight: "fit-content",
                                        borderRadius: "16px",
                                    }}
                                >

                                    <Table stickyHeader sx={{ width: "100%" }}>
                                        <TableHead >
                                            <TableRow>
                                                <TableCell
                                                    width={"10%"}
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 700,
                                                        color: "#292B2C",
                                                        bgcolor: "#F1F0FE",
                                                    }}
                                                    align="center"
                                                >
                                                    No Antri
                                                </TableCell>
                                                <TableCell
                                                    width={"10%"}
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 700,
                                                        color: "#292B2C",
                                                        bgcolor: "#F1F0FE",
                                                    }}
                                                    align="center"
                                                >
                                                    No RM
                                                </TableCell>
                                                <TableCell
                                                    width={"10%"}
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 700,
                                                        color: "#292B2C",
                                                        bgcolor: "#F1F0FE",
                                                    }}
                                                    align="center"
                                                >
                                                    Jenis Kunjungan
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
                                                    Dokter yang dituju
                                                </TableCell>
                                                <TableCell
                                                    width={"10%"}
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 700,
                                                        color: "#292B2C",
                                                        bgcolor: "#F1F0FE",
                                                    }}
                                                    align="center"
                                                >
                                                    Nama Pasien
                                                </TableCell>
                                                {selected === 'Antrian' && (
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
                                                )}

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
                                                            {data.nomorAntrian}
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
                                                            {data.nomorRM}
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
                                                            align="center"
                                                        >
                                                            {data.jenisKunjungan}
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
                                                            align="center"
                                                        >
                                                            {data.dokter}
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
                                                            align="center"
                                                        >
                                                            <BadgeStatusPasien
                                                                name={data.namaPasien}
                                                                status={data.status}
                                                                color={
                                                                    data.status === 'Baru'
                                                                        ? '#D5D1FB'
                                                                        : data.status === 'INACTIVE'
                                                                            ? '#FA4659'
                                                                            : ''
                                                                }
                                                            />
                                                        </TableCell>
                                                        {selected === 'Antrian' && (
                                                            <TableCell
                                                                align="center"
                                                                sx={[
                                                                    {
                                                                        color: "#292B2C",
                                                                        fontSize: "14px",
                                                                        textTransform: "capitalize",
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        gap: 2,
                                                                    },
                                                                ]}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        padding: '8px',
                                                                        border: countdowns[data.nomorAntrian]?.isCounting ? '1px solid #A8A8BD' : '1px solid #8F85F3',
                                                                        width: '30%',
                                                                        height: '25px',
                                                                        bgcolor: countdowns[data.nomorAntrian]?.isCounting ? '#A8A8BD' : '#8F85F3',
                                                                        borderRadius: '8px',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',


                                                                    }}
                                                                    onClick={() => countDownPanggil(data.nomorAntrian)}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            cursor: countdowns[data.nomorAntrian]?.isCounting ? 'default' : 'pointer',
                                                                            color: countdowns[data.nomorAntrian]?.isCounting ? '#ccc' : 'white',
                                                                            fontSize: '16px',
                                                                        }}
                                                                    >
                                                                        {countdowns[data.nomorAntrian]?.isCounting ? countdowns[data.nomorAntrian]?.countdown : 'Panggil'}
                                                                    </Typography>
                                                                </Box>
                                                                <Link
                                                                    href="/detailRawat"
                                                                    mr={2}
                                                                    underline="none"
                                                                    sx={{
                                                                        textTransform: "capitalize",
                                                                        color: "#8F85F3",
                                                                    }}
                                                                >
                                                                    <Box padding={'8px'} border={'1px solid #8F85F3'} width={'100%'} height={'25px'} bgcolor={'inherit'} borderRadius={'8px'} justifyContent={'center'} alignItems={'center'} >
                                                                        <Typography color="#8F85F3" >Lihat Detail</Typography>
                                                                    </Box>
                                                                </Link>
                                                                <Link
                                                                    href="# "
                                                                    underline="hover"
                                                                    sx={{
                                                                        textTransform: "capitalize",
                                                                        color: "#8F85F3",
                                                                    }}
                                                                >
                                                                    <Button color="primary" sx={{
                                                                        padding: '0px', bgcolor: '#ffff', border: '1px solid #8F85F3', color: '#8F85F3', width: '1%', borderRadius: '8px', height: '44px', '&:hover': {
                                                                            backgroundColor: "#8F85F3", color: '#ffff',
                                                                        },
                                                                    }}
                                                                        onClick={handleMenuClick}>
                                                                        <MoreVertIcon />
                                                                    </Button>
                                                                </Link>
                                                            </TableCell>
                                                        )}

                                                    </StyledTableRow>
                                                ))
                                            ) : (
                                                <StyledTableRow>
                                                    <TableCell colSpan={11} align="center">
                                                        Tidak ada data
                                                    </TableCell>
                                                </StyledTableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </StyledTableContainer>
                            </Box>
                            <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                <ShowingDataInformation length={datas.length} rowsPerPage={rowsPerPage} page={page} />
                                <PaginationTable length={datas.length} rowsPerPage={rowsPerPage} page={page} onChange={handleChangePage} />
                            </Stack>

                        </Box>
                    </Collapse>


                </Box >

            </Box >
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        position: 'fixed',
                        borderRadius: '16px',
                        border: '1px solid #A8A8BD',
                        width: '329px',
                        height: '120px',
                        gap: '8px',
                        borderWidth: '1px',
                        padding: '8px',
                        zIndex: 99999

                    },
                }}
            >
                <MenuItem onClick={() => { handleMenuClose(); }}>
                    <Typography
                        sx={{
                            fontFamily: 'Roboto',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '18px',
                            letterSpacing: '0%',
                            color: '#8F85F3',
                            padding: '8px',
                        }}
                    >
                        Lewati Antrian
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); }}>
                    <Typography
                        sx={{
                            fontFamily: 'Roboto',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '18px',
                            letterSpacing: '0%',
                            color: '#8F85F3',
                            padding: '8px',
                        }}
                    >
                        Lihat Detail
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
}
