import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/imageComponent/ImageGrid";
import CardDetailKonter from "./CardDetailKonter";
import CardOperasionalKlinik from "../../../components/small/card/CardOperasional";

//hooks
import useDetailKonter from "../hooks/useDetailKonter";

export default function DetailKonter() {
    const {
        breadcrumbItems,
        largeImage,
        smallImage,
        loading,
        counterData
    } = useDetailKonter();

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <ImageGrid largeImage={largeImage} smallImages={smallImage} loading={loading} />
            </Box>

            <Box mt={3}>
                <CardDetailKonter
                    title="Detail Konter"
                    data={{
                        nama: counterData?.name || "",
                        lokasiKonter: counterData?.location || "",
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
                    data={counterData?.operationalSchedule || {
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
        </Container>
    );
}
