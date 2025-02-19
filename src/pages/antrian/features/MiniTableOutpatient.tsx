import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link, Menu, MenuItem, } from "@mui/material";
import { styled } from "@mui/material/styles";

//Icon
import MoreVertIcon from '@mui/icons-material/MoreVert';

import useMiniTableRawatJalan from "../hooks/useMiniTableOutpatient";
import { useEffect } from "react";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import ModalConfirmationSkipPatient from "../../../components/medium/modal/ModalConfirmationSkipPatient";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
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
interface MiniTableOutpatientProps {
    showAll: boolean;
}
export default function MiniTableOutpatient(props: MiniTableOutpatientProps) {
    const { showAll } = props;

    const {
        displayedData,
        anchorEl,
        handleMenuClick,
        handleMenuClose,
        setShowAll,
        alertPanggil,
        countDownPanggil,
        countdowns,
        handleOpenModal,
        handleCloseModal,
        openModal

    } = useMiniTableRawatJalan();

    useEffect(() => {
        if (showAll) {
            setShowAll(showAll);

        }
    }, [showAll, setShowAll]);

    return (
        <Box>
            {alertPanggil && (
                <AlertSuccess label="Pasien sedang dipanggil" />
            )}
            <Box position={"relative"} p={3} sx={{ borderRadius: "24px", bgcolor: "transparent", overflow: "hidden" }}>
                <Box>
                    <StyledTableContainer
                        sx={{
                            mt: '-2%',
                            boxShadow: "none",
                            // mb: 2,
                            maxHeight: "250px",
                            borderRadius: "16px",
                            overflowY: showAll ? "auto" : "hidden"
                        }}
                    >
                        <Table stickyHeader sx={{ width: "100%" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={"15%"} sx={{ lineHeight: '18px', fontSize: "16px", fontWeight: 600, color: "#292B2C", bgcolor: "#F1F0FE" }} align="center">
                                        No Antri
                                    </TableCell>
                                    <TableCell width={"15%"} sx={{ fontSize: "14px", fontWeight: 700, color: "#292B2C", bgcolor: "#F1F0FE" }} align="center">
                                        No RM
                                    </TableCell>
                                    <TableCell width={"20%"} sx={{ fontSize: "14px", fontWeight: 700, color: "#292B2C", bgcolor: "#F1F0FE" }} align="center">
                                        Nama Pasien
                                    </TableCell>
                                    <TableCell width={"5%"} sx={{ fontSize: "14px", fontWeight: 700, color: "#292B2C", bgcolor: "#F1F0FE" }} align="center">
                                        Aksi
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedData.length > 0 ? (
                                    displayedData.map((data, index) => (
                                        <StyledTableRow key={index}>
                                            <TableCell sx={{ color: "#292B2C", fontSize: "14px" }} align="center">
                                                {data.nomorAntrian}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    color: "#292B2C",
                                                    fontSize: "14px",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "150px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="center"
                                            >
                                                {data.nomorRM}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    color: "#292B2C",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "150px",
                                                    fontSize: "14px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="center"
                                            >
                                                {data.namaPasien}
                                            </TableCell>

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
                                                        gap: 1,
                                                    },
                                                ]}
                                            >
                                                <Link
                                                    href="#"
                                                    underline="none"
                                                    color={"#8F85F3"}
                                                    onClick={() => countDownPanggil(data.nomorAntrian)}
                                                // sx={{ mr: 2 }}
                                                >
                                                    {/* Panggil */}
                                                    <Box padding={'6px'} border={'1px solid #8F85F3'} width={'74px'} height={'24px'} bgcolor={'#8F85F3'} borderRadius={'8px'} justifyContent={'center'} alignItems={'center'} >
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
                                                </Link>
                                                <Link
                                                    href="/detailRawat"
                                                    // mr={2}
                                                    underline="none"
                                                    sx={{
                                                        textTransform: "capitalize",
                                                        color: "#8F85F3",
                                                    }}
                                                >
                                                    <Box padding={'6px'} border={'1px solid #8F85F3'} width={'65px'} height={'fit-content'} bgcolor={'inherit'} borderRadius={'8px'} justifyContent={'center'} alignItems={'center'} >
                                                        <Typography fontSize={'12px'} color="#8F85F3" >Lihat Detail</Typography>
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
                                                    <Box padding={'2px'} px={'14px'} border={'1px solid #8F85F3'} width={'15px'} height={'26px'} bgcolor={'inherit'} borderRadius={'8px'} display={'flex'} justifyContent={'center'} alignItems={'center'} onClick={handleMenuClick} >
                                                        <MoreVertIcon sx={{ color: "#8F85F3", fontSize: "16px" }} />
                                                    </Box>
                                                </Link>
                                            </TableCell>
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
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            sx={{
                                '& .MuiPaper-root': {
                                    borderRadius: '16px',
                                    border: '1px solid #A8A8BD',
                                    width: '329px',
                                    height: '120px',
                                    gap: '8px',
                                    borderWidth: '1px',
                                    padding: '8px',
                                    top: '0px',
                                    left: '172px',

                                },
                            }}
                        >
                            <MenuItem onClick={() => { handleOpenModal(); handleMenuClose(); }}>
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
                            <MenuItem onClick={() => { handleOpenModal(); handleMenuClose(); }}>
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
                    </StyledTableContainer>

                </Box>

            </Box>
            <ModalConfirmationSkipPatient open={openModal} onClose={handleCloseModal} />
        </Box>
    );
}
