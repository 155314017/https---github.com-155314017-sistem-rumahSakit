/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
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
import AlertSuccess from '../../../components/small/alert/AlertSuccess';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TableAntrian from '../../pasien/pasienRawatJalan/features/TableAntrian';

export default function QueueDashboard({ selectedValue }: any) {
    const [successSkipPatient, setSuccessSkipPatient] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state && location.state.successSkip) {
            showTemporarySuccessSkipPatient();
            navigate(location.pathname);
        }
    }, [location.state, navigate]);

    const showTemporarySuccessSkipPatient = async () => {
        setSuccessSkipPatient(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setSuccessSkipPatient(false)
    }


    return (
        <Box>
            <Box>
                {successSkipPatient && <AlertSuccess label="Pasien Berhasil Dilewati" />}
                {selectedValue === 'Dasboard' ? <Typography sx={{ fontSize: '32px', fontWeight: '700', mb: 2, mt: 2 }}>Dashboard</Typography> : <Typography sx={{ fontSize: '32px', fontWeight: '700', mb: 2, mt: 2 }}>Rawat Jalan - {selectedValue}</Typography>}

                <Grid container justifyContent={'space-between'} flex={1} flexDirection={'row'} width={'100%'} >
                    <Box display={'flex'} flexDirection={'column'} gap={2} width={'49%'} >
                        <Box display={'flex'} flexDirection={'row'} gap={1.5}  >
                            <MediumCard
                                icon={ManageAccountsIcon}
                                title={'Total pasien hari ini'}
                                subtitle='100 Orang'
                            />
                            <MediumCard
                                icon={AccessibleForwardOutlinedIcon}
                                title={'Total pasien belum check in'}
                                subtitle={'200 Orang'}
                            />
                        </Box>
                        {selectedValue === 'Dasboard' && <CardPanggilPasien />}
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} gap={2} width={'49%'} >
                        <Box display={'flex'} flexDirection={'row'} gap={1.5}>
                            <MediumCard
                                icon={HotelOutlinedIcon}
                                title={'Total pasien hari ini'}
                                subtitle='100 Orang'
                            />
                            <CardAdd icon={AddSharpIcon} title="Tambah pasien" link="/tambahRuangan" />
                        </Box>
                        {selectedValue === 'Dasboard' && <CardPasienTerlewati />}
                    </Box>
                </Grid>
                <Box mt={3} >
                    {selectedValue === 'Dasboard' ? <TableRawatJalan /> : <TableAntrian />}



                </Box>

            </Box>
        </Box>
    )
}
