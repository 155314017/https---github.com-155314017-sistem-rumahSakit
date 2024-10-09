import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageGrid from "../../components/medium/ImageGrid";
import { Link } from "@mui/material";
import CardOperasionalKlinik from "../../components/medium/CardOperasional";
import CardDetail from "../../components/medium/CardDetail";

export default function DetailKonter() {
    const breadcrumbItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Konter",
            href: "/konter",
        },
        {
            label: "Detail Konter",
            href: "/detailKonter",
        },
    ];

    const largeImage = "path_to_your_large_image.jpg";
    const smallImages = [
        "path_to_image1.jpg",
        "path_to_image2.jpg",
        "path_to_image3.jpg",
        "path_to_image4.jpg",
    ];

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <ImageGrid largeImage={largeImage} smallImages={smallImages} />
            </Box>

            <Box mt={3}>
                <CardDetail
                    title="Nama Konter"
                    columns={[
                        { id: "nomorKonter", label: "No. Konter" },
                        { id: "tipeKonter", label: "Tipe Konter" },
                        { id: "lokasiKonter", label: "Lokasi Konter" },
                        
                    ]}
                    data={[{ nomorKonter: "1234", tipeKonter: "Asuransi", lokasiKonter: "Paingan" }]}
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
                />
            </Box>

            <Box mt={3}>
                <CardOperasionalKlinik
                    title="Jam Operasional"
                    data={{
                        senin: "10.30 - 15.00",
                        selasa: "10.30 - 15.00",
                        rabu: "10.30 - 15.00",
                        kamis: "10.30 - 15.00",
                        jumat: "10.30 - 15.00",
                        sabtu: "10.30 - 15.00",
                        minggu: "10.30 - 15.00",
                    }}
                />
            </Box>
        </Container>
    );
}
