import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link, Menu, MenuItem, } from "@mui/material";
import { styled } from "@mui/material/styles";

//Icon
import MoreVertIcon from '@mui/icons-material/MoreVert';

import useMiniTableRawatJalan from "../hooks/useMiniTableRawatJalan";
import { useEffect } from "react";

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
interface MiniTableRawatJalanProps {
    showAll: boolean;
  }
export default function MiniTableRawatJalan(props: MiniTableRawatJalanProps) {
    const { showAll } = props;
    const { displayedData, confirmationDelete,
        anchorEl,
        handleMenuClick,
        handleMenuClose,
        setShowAll
     } = useMiniTableRawatJalan();

     useEffect(() => {
        if (showAll) {
          setShowAll(showAll);

        }
      }, [showAll, setShowAll]);
     
    
    

    return (
        <Box>
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
                                                    onClick={confirmationDelete}
                                                // sx={{ mr: 2 }}
                                                >
                                                    {/* Panggil */}
                                                    <Box padding={'6px'} border={'1px solid #8F85F3'} width={'fit-content'} height={'fit-content'} bgcolor={'#8F85F3'} borderRadius={'8px'} justifyContent={'center'} alignItems={'center'} >
                                                        <Typography fontSize={'12px'} color="white" >Panggil</Typography>
                                                    </Box>
                                                </Link>
                                                <Link
                                                    href="#"
                                                    // mr={2}
                                                    underline="hover"
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
                                vertical: 'top', // Position the menu below the button
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom', // Align the top of the menu with the bottom of the button
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
                            <MenuItem onClick={() => { handleMenuClose(); }}>
                                <Typography
                                    sx={{
                                    fontFamily: 'Roboto',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '18px',
                                    letterSpacing: '0%',
                                    color: '#8F85F3', // Text color,
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
                                    color: '#8F85F3', // Text color
                                    padding: '8px',
                                    }}
                                >
                                    Lihat Detail
                                </Typography>
                                </MenuItem>
                        </Menu>
                    </StyledTableContainer>

                </Box>

                {/* <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography sx={{ color: "#A8A8BD" }}>
                        Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, datas.length)} of {datas.length} entries
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
                                border: "none",
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#8F85F3",
                                bgcolor: "#D5D1FB",
                            },
                            "& .MuiPaginationItem-ellipsis": {
                                border: "none",
                            },
                        }}
                    />
                </Stack> */}
            </Box>
        </Box>
    );
}
