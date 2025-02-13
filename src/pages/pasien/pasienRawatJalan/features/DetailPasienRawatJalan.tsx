import { Container, Box } from "@mui/system";
import BreadCrumbs from "../../../../components/medium/BreadCrumbs";
import CardInfoPasienRawatJalan from "../../../../components/small/card/CardInfoPasienRawatJalan";
import CardRekamMedis from "../../../../components/small/card/CardRekamMedis";
import CardAppointmentCard from "../../../../components/small/card/CardAppointmentCard";
import profilePict from "../../../../assets/img/meme.jpg";
import imgString from "../../../../assets/img/String.png";
import { Button } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useDetailPasienRawatJalan from "../hooks/useDetailPasienRawatJalan";


export default function DetailPasienRawatJalan() {
    const {
        breadcrumbItems,
        handleDeleteSuccess,
    } = useDetailPasienRawatJalan();

    return (
        <>
            <Container sx={{ py: 2, minWidth: '100%', minHeight: 'fit-content', position: 'relative', pb:15 }}>
                <BreadCrumbs
                    breadcrumbItems={breadcrumbItems}
                    onBackClick={() => window.history.back()}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box
                        mt={3}
                        display={'flex'}
                        flexDirection={'column'}
                        gap={3}
                        sx={{ flexShrink: 0, width: '25%' }}
                    >
                        <CardInfoPasienRawatJalan
                            namaLengkap="Haji Rashford"
                            jenisKelamin="Lanang"
                            nomorMR="12123"
                            tanggalLahir="1999-09-09"
                            avatarUrl={profilePict}
                            onUbahData={() => { }}
                            onHapusData={() => handleDeleteSuccess()}
                        />
                        <CardAppointmentCard />
                    </Box>

                    <Box
                        mt={3}
                        sx={{ flexShrink: 0, width: '72.5%' }}
                    >
                        <CardRekamMedis />
                    </Box>
                </Box>
            </Container>

            <Box
                sx={{
                    width: '100%',
                    height: '100px',
                    bgcolor: 'white',
                    zIndex: 999,
                    position: 'fixed',
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    boxShadow: '0px -8px 8px rgba(0, 0, 4, 0.05)',
                }}
            >
                <Button sx={{
                    width: '44px',
                    height: '44px',
                    bgcolor: 'inherit',
                    color: '#8F85F3',
                    border: '1px solid #8F85F3',
                    // position: 'relative',
                    // zIndex: 2,
                }}>
                    <MoreVertIcon />
                </Button>
                <Button sx={{
                    width: '642px',
                    height: '44px',
                    bgcolor: 'inherit',
                    color: '#8F85F3',
                    border: '1px solid #8F85F3',
                    position: 'relative',
                    zIndex: 2,
                }}>
                    Proses Pasien
                </Button>
                <Button sx={{
                    width: '642px',
                    height: '44px',
                    bgcolor: '#8F85F3',
                    color: 'white',
                    border: '1px solid #8F85F3',
                    position: 'relative',
                    zIndex: 2,
                }}>
                    Panggil Pasien
                </Button>

                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    // left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                }}>
                    <img src={imgString} alt="bgImage" style={{ height: '100%' }} />
                </Box>
            </Box>
        </>
    );
}
