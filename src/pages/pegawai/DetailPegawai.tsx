import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageGrid from "../../components/medium/ImageGrid";
import { Link } from "@mui/material";
import CardDetail from "../../components/medium/CardDetail";
import TablePegawai from "./TablePegawai";
import CardIzinAkses from "./CardIzinAkses";
import CardBiodataPegawai from "./CardBiodataPegawai";
import CardJamPraktek from "./CardJamPraktek";

export default function DetailPegawai() {
    const breadcrumbItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Ruangan",
            href: "/ruangan",
        },
        {
            label: "Detail Ruangan",
            href: "/detailRuangan",
        },
    ];


    return (
        <Container sx={{ py: 2, minWidth: '85vw' }} >
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
                    <CardBiodataPegawai />
                    <CardJamPraktek />
                </Box>
                <Box mt={3} >
                    <CardIzinAkses />
                </Box>

            </Box>
        </Container>
    );
}
