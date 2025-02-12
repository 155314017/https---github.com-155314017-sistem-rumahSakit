import { Container, Box } from "@mui/system";
import useDetailDokter from "../../../dokter/hooks/useDetailDokter";
import BreadCrumbs from "../../../../components/medium/BreadCrumbs";
import CardInfoPasienRawatJalan from "../../../../components/small/card/CardInfoPasienRawatJalan";
import CardRekamMedis from "../../../../components/small/card/CardRekamMedis";
import CardAppointmentCard from "../../../../components/small/card/CardAppointmentCard";
import profilePict from "../../../../assets/img/meme.jpg";


export default function DetailPasienRawatJalan() {
    const {
        breadcrumbItems,
        handleDeleteSuccess,
    } = useDetailDokter();


    return (
        <Container sx={{ py: 2, minWidth: '100%' }}>
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
                        tanggalDitambahkan={"Data Tidak Ditemukan"}
                        namaPegawai={"Data Tidak Ditemukan"}
                        jenisKelamin={"Data Tidak Ditemukan"}
                        alamat={"Data Tidak Ditemukan"}
                        nomorIndukPegawai={"Data Tidak Ditemukan"}
                        rolePegawai={"Data Tidak Ditemukan"}
                        noHandphone={"Data Tidak Ditemukan"}
                        dokumen={"Data Tidak Ditemukan"}
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

    );
}
