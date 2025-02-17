import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import CardIzinAkses from "../../../components/small/card/CardIzinAkses";
import CardBiodataPegawai from "../../../components/small/card/CardBiodataPegawai";
import CardJamPraktek from "../../../components/small/card/CardJamPraktek";
import useDetailPegawai from "../hooks/useDetailPegawai";

export default function DetailPegawai() {
    const {
        breadcrumbItems,
        employeeData,
        handleDeleteSuccess,
    } = useDetailPegawai();


    return (
        <Container sx={{ py: 2, minWidth: '90vw' }} >
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 10 }} >

                <Box mt={3} width={'30%'} display={'flex'} flexDirection={'column'} gap={3} >
                    <CardBiodataPegawai
                        tanggalDitambahkan={employeeData?.createdDateTime || "Data Tidak Ditemukan"}
                        namaPegawai={employeeData?.name || "Data Tidak Ditemukan"}
                        jenisKelamin={employeeData?.gender || "Data Tidak Ditemukan"}
                        alamat={employeeData?.address || "Data Tidak Ditemukan"}
                        nomorIndukPegawai={employeeData?.employeeNumber || "Data Tidak Ditemukan"}
                        rolePegawai={employeeData?.role || "Data Tidak Ditemukan"}
                        noHandphone={employeeData?.phone || "Data Tidak Ditemukan"}
                        dokumen={employeeData?.additionalInfo || "Data Tidak Ditemukan"}
                        avatarUrl={""}
                        onUbahData={() => { }}
                        onHapusData={() => handleDeleteSuccess()}
                    />
                    <CardJamPraktek
                        title="Jam Operasional"
                        data={{
                            senin: "-",
                            selasa: "-",
                            rabu: "-",
                            kamis: "-",
                            jumat: "-",
                            sabtu: "-",
                            minggu: "-",
                        }} />
                </Box>
                <Box mt={3} >
                    <CardIzinAkses />
                </Box>
            </Box>
        </Container>
    );
}
