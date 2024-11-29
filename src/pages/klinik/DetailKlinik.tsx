import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageGrid from "../../components/medium/ImageGrid";
import CardDetailKlinik from "./CardDetailKlinik";
import CardOperasionalKlinik from "../../components/medium/CardOperasional";

export default function DetailKlinik() {
    const breadcrumbItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Klinik",
            href: "/klinik",
        },
        {
            label: "Detail Klinik",
            href: "/detailKlinik",
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
                <ImageGrid largeImage={largeImage} smallImages={smallImages} loading={false} />
            </Box>

            <Box mt={3}>
                <CardDetailKlinik
                    title="Jam Operasional"
                    data={{
                        biaya: "K 204",
                        waktuPelayanan: "Sayap Timur lt.2",
                        aksi: {
                            hapusLink: "#",
                            ubahLink: "#",
                        },
                    }}
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
