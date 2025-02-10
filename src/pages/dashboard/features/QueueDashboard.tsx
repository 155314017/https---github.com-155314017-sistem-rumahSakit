import { Typography } from '@mui/material'
import { Box, Grid } from '@mui/system'
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import CardAdd from '../../../components/small/card/CardAdd'
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MediumCard from '../../../components/small/card/MediumCard'
import CardPanggilPasien from '../../../components/small/card/CardPanggilPasien';
import CardPasienTerlewati from '../../../components/small/card/CardPasienTerlewati';
import TableRawatJalan from '../../pasien/pasienRawatJalan/features/TableRawatJalan';

export default function QueueDashboard() {
    return (
        <Box>
            <Box>
                <Typography sx={{ fontSize: '32px', fontWeight: '700', mb: 2, mt: 2 }}>Dashboard Antrian</Typography>
                <Grid container justifyContent={'space-between'} flex={1} flexDirection={'row'} >
                    <Box display={'flex'} flexDirection={'column'} gap={2} width={'48%'}>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                            <MediumCard
                                icon={ManageAccountsIcon}
                                title={'Total pasien hari ini'}
                                subtitle='100 Orang'
                            />
                            <MediumCard
                                icon={AccessibleForwardOutlinedIcon}
                                title={'Total pasien belum check in'}
                                subtitle={'200 Orang'} />
                        </Box>
                        <CardPanggilPasien />
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} gap={2} width={'48%'}>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                            <MediumCard
                                icon={HotelOutlinedIcon}
                                title={'Total pasien hari ini'}
                                subtitle='100 Orang'
                            />
                            <CardAdd icon={AddSharpIcon} title="Tambah pasien" link="/tambahRuangan" />
                        </Box>
                        <CardPasienTerlewati />
                    </Box>
                </Grid>
                <Box mt={3} >
                    <TableRawatJalan />
                </Box>

            </Box>
        </Box>
    )
}
