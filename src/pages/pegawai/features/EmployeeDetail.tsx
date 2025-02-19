import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import CardAccessPermit from "../../../components/small/card/CardAccessPermit";
import CardBiodataEmployee from "../../../components/small/card/CardBiodataEmployee";
import CardPracticeHours from "../../../components/small/card/CardPracticeHours";
import useDetailEmployee from "../hooks/useDetailEmployee";

export default function EmployeeDetail() {
    const {
        breadcrumbItems,
        employeeData,
        handleDeleteSuccess,
    } = useDetailEmployee();


    return (
        <Container sx={{ py: 2, minWidth: '90vw' }} >
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 10 }} >

                <Box mt={3} width={'30%'} display={'flex'} flexDirection={'column'} gap={3} >
                    <CardBiodataEmployee
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
                    <CardPracticeHours
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
                    <CardAccessPermit />
                </Box>
            </Box>
        </Container>
    );
}
