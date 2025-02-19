import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/header/Header";
import MediumCard from "../../../components/small/card/MediumCard";
import CardAdd from "../../../components/small/card/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TablePegawai from "./TableEmployee";

export default function Pegawai() {
    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Pegawai
                    </Typography>
                    <Grid container spacing={3}
                        sx={{
                            flex: 1,
                            mb: 3,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            '@media (max-width: 990px)': {
                                flexDirection: 'column'
                            },
                            '@media (min-width: 990px) and (max-width: 1360px)': {
                                flexDirection: 'row',
                            }
                        }}
                    >
                        <Grid
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '32%',
                                gap: 2,
                                '@media (max-width: 990px)': {
                                    flexDirection: 'row',
                                    width: 'auto'
                                },
                                '@media (min-width: 990px) and (max-width: 1360px)': {
                                    width: '30%'
                                }
                            }}
                        >
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Dokter Spesialis" subtitle="89" />
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Dokter Umum" subtitle="127" />
                        </Grid>

                        <Grid
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '32%',
                                gap: 2,
                                '@media (max-width: 990px)': {
                                    flexDirection: 'row',
                                    width: 'auto'
                                },
                                '@media (min-width: 990px) and (max-width: 1360px)': {
                                    width: '30%'
                                }
                            }}
                        >
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Perawat" subtitle="267" />
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Admin" subtitle="108" />
                        </Grid>
                        <Grid
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '32%',
                                gap: 2,
                                '@media (max-width: 990px)': {
                                    flexDirection: 'row',
                                    width: 'auto'
                                },
                                '@media (min-width: 990px) and (max-width: 1360px)': {
                                    width: '30%',
                                }
                            }}
                        >
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Manajemen" subtitle="48" />
                            <CardAdd icon={AddBoxIcon} title="Tambah Pegawai" link="/tambahPegawai" />
                        </Grid>
                    </Grid>
                    <TablePegawai />
                </Box>
            </Box>
        </Box>
    );
}
