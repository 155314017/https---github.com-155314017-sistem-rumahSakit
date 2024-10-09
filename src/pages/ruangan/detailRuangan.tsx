import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageGrid from "../../components/medium/ImageGrid";
import { Link } from "@mui/material";
import CardDetail from "../../components/medium/CardDetail";

export default function DetailRuangan() {
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
                    title="Nama Ruangan"
                    columns={[
                        { id: "nomorRuangan", label: "No. Ruangan" },
                        { id: "namaGedung", label: "Nama Gedung" },
                        { id: "jenisRuangan", label: "Jenis Ruangan" },

                    ]}
                    data={[{ nomorRuangan:"abc1", namaGedung:"Gedung A", jenisRuangan:"VIP" }]}
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
        </Container>
    );
}
