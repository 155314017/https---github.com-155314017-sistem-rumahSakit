import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import CardIzinAkses from "../../pegawai/features/CardIzinAkses";
import CardBiodataPegawai from "../../pegawai/features/CardBiodataPegawai";
import CardJamPraktek from "../../pegawai/features/CardJamPraktek";
import useDetailDokter from "../hooks/useDetailDokter";

export default function DetailDokter() {
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
                    <CardBiodataPegawai 
                    tanggalDitambahkan= {doctorData?.employeeData?.updatedBy || "Data Tidak Ditemukan"}
                    namaPegawai= {doctorData?.employeeData?.name || "Data Tidak Ditemukan"}
                    jenisKelamin= {doctorData?.employeeData?.gender || "Data Tidak Ditemukan"}
                    alamat= {doctorData?.employeeData?.address || "Data Tidak Ditemukan"}
                    nomorIndukPegawai= {doctorData?.employeeData?.employeeNumber || "Data Tidak Ditemukan"}
                    rolePegawai= {doctorData?.employeeData?.role || "Data Tidak Ditemukan"}
                    noHandphone= {doctorData?.employeeData?.phone || "Data Tidak Ditemukan"}
                    dokumen= {doctorData?.employeeData?.additionalInfo || "Data Tidak Ditemukan"}
                    avatarUrl= {""}
                    onUbahData={() => {}}
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
                    <CardIzinAkses />
                </Box>

            </Box>
        </Container>
    );
}
