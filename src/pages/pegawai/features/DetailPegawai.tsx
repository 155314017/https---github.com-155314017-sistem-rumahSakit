import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import CardIzinAkses from "./CardIzinAkses";
import CardBiodataPegawai from "./CardBiodataPegawai";
import CardJamPraktek from "./CardJamPraktek";
import useDetailPegawai from "../hooks/useDetailPegawai";

export default function DetailPegawai() {
   const {
    breadcrumbItems,
    // name,
    // deletedItems,
    employeeData,
    handleDeleteSuccess,
    // confirmationDelete,
   } = useDetailPegawai();


    return (
        <Container sx={{ py: 2, minWidth: '90vw' }} >
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 10 }} >

                <Box mt={3} width={'30%'} display={'flex'} flexDirection={'column'} gap={3} >
                    {/* <CardDetail
                        title="Nama Ruangan"
                        columns={[
                            { id: "nomorRuangan", label: "No. Ruangan" },
                            { id: "namaGedung", label: "Nama Gedung" },
                            { id: "jenisRuangan", label: "Jenis Ruangan" },

                        ]}
                        data={[{ nomorRuangan: "abc1", namaGedung: "Gedung A", jenisRuangan: "VIP" }]}
                        actions={() => (
                            <>
                                <Link underline="hover" sx={{ color: "#8F85F3" }} href="/hapus">
                                    Hapus
                                </Link>
                                <Link underline="hover" sx={{ color: "#8F85F3" }} href="/ubah">
                                    Ubah
                                </Link>
                            </>
                        )}
                    /> */}
                    <CardBiodataPegawai
                    tanggalDitambahkan= {employeeData?.createdDateTime || "Data Tidak Ditemukan"}
                    namaPegawai= {employeeData?.name || "Data Tidak Ditemukan"}
                    jenisKelamin= {employeeData?.gender || "Data Tidak Ditemukan"}
                    alamat= {employeeData?.address || "Data Tidak Ditemukan"}
                    nomorIndukPegawai= {employeeData?.employeeNumber || "Data Tidak Ditemukan"}
                    rolePegawai= {employeeData?.role || "Data Tidak Ditemukan"}
                    noHandphone= {employeeData?.phone || "Data Tidak Ditemukan"}
                    dokumen= {employeeData?.additionalInfo || "Data Tidak Ditemukan"}
                    avatarUrl= {""}
                    onUbahData={() => {}}
                    onHapusData={() => handleDeleteSuccess()}
                    />
                    <CardJamPraktek 
                     title="Jam Operasional"
                     data={employeeData?.operationalSchedule || {
                         senin: "-",
                         selasa: "-",
                         rabu: "-",
                         kamis: "-",
                         jumat: "-",
                         sabtu: "-",
                         minggu: "-",
                     }}/>
                </Box>
                <Box mt={3} >
                    <CardIzinAkses />
                </Box>

            </Box>
        </Container>
    );
}
