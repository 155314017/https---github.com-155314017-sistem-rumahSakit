import * as React from 'react';
import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAddOnClick from "../../components/medium/CardAddOnClick";
import TablePasien from "./TablePasien";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalKategoriPasien from '../../components/small/ModalKategoriPasien';

export default function Pasien() {
    // Deklarasikan state `open` di dalam fungsi komponen
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Pasien
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Pasien" subtitle="899" />
                        <CardAddOnClick
                            icon={AddBoxIcon}
                            title="Tambah Pasien"
                            link="/add-patient" 
                            onClick={() => setOpen(true)} 
                        />
                    </Grid>
                    <TablePasien />
                </Box>
            </Box>

            <ModalKategoriPasien open={open} onClose={() => setOpen(false)} />
        </Box>
    );
}
