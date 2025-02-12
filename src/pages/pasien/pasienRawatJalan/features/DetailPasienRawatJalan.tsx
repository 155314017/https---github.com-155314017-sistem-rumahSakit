import { Container, Box } from "@mui/system";
import useDetailDokter from "../../../dokter/hooks/useDetailDokter";
import BreadCrumbs from "../../../../components/medium/BreadCrumbs";
import CardJamPraktek from "../../../pegawai/features/CardJamPraktek";
import CardInfoPasienRawatJalan from "../../../../components/small/card/CardInfoPasienRawatJalan";
import CardRekamMedis from "../../../../components/small/card/CardRekamMedis";


export default function DetailPasienRawatJalan() {
    const {
        breadcrumbItems,
        doctorData,
        handleDeleteSuccess,
    } = useDetailDokter();


    return (
        <Container sx={{ py: 2, minWidth: '90vw' }} >
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 10 }} >

                <Box mt={3} width={'30%'} display={'flex'} flexDirection={'column'} gap={3} >

                    <CardInfoPasienRawatJalan
                        tanggalDitambahkan={"Data Tidak Ditemukan"}
                        namaPegawai={"Data Tidak Ditemukan"}
                        jenisKelamin={"Data Tidak Ditemukan"}
                        alamat={"Data Tidak Ditemukan"}
                        nomorIndukPegawai={"Data Tidak Ditemukan"}
                        rolePegawai={"Data Tidak Ditemukan"}
                        noHandphone={"Data Tidak Ditemukan"}
                        dokumen={"Data Tidak Ditemukan"}
                        avatarUrl={""}
                        onUbahData={() => { }}
                        onHapusData={() => handleDeleteSuccess()}
                    />
                    <CardJamPraktek
                        title="Jam Operasional"
                        data={doctorData?.operationalSchedule || {
                            senin: "-",
                            selasa: "-",
                            rabu: "-",
                            kamis: "-",
                            jumat: "-",
                            sabtu: "-",
                            minggu: "-",
                        }}
                    />
                </Box>
                <Box mt={3} >
                    {/* <CardIzinAkses /> */}
                    <CardRekamMedis />
                </Box>

            </Box>
        </Container>
    );
}
