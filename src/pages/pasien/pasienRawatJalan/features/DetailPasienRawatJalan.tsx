import { Container, Box } from "@mui/system";
import useDetailDokter from "../../../dokter/hooks/useDetailDokter";
import BreadCrumbs from "../../../../components/medium/BreadCrumbs";
import CardInfoPasienRawatJalan from "../../../../components/small/card/CardInfoPasienRawatJalan";
import CardRekamMedis from "../../../../components/small/card/CardRekamMedis";
import CardAppointmentCard from "../../../../components/small/card/CardAppointmentCard";
import profilePict from "../../../../assets/img/meme.jpg";
import imgString from "../../../../assets/img/String.png";
import { Button } from "@mui/material";


export default function DetailPasienRawatJalan() {
    const {
        breadcrumbItems,
        handleDeleteSuccess,
    } = useDetailDokter();

    return (
        <>
            <Container sx={{ py: 2, minWidth: '100%', minHeight: '100vh', position: 'relative' }}>
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
                    position: 'absolute',
                    bottom: -655,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px -8px 8px rgba(0, 0, 4, 0.05)',
                }}
            >
                <Button sx={{
                    width: '90%',
                    height: '38px',
                    bgcolor: '#8F85F3',
                    color: 'white',
                    border: '1px solid #8F85F3',
                    position: 'relative',
                    zIndex: 2,
                }}>
                    Selesai
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
