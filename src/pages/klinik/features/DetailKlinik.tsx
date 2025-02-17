import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/ImageGrid";
import CardDetailKlinik from "./CardDetailKlinik";
//hooks
import useDetailKlinik from "../hooks/useDetailKlinik";
import CardOperasional from "../../../components/small/card/CardOperasional";

export default function DetailKlinik() {
    const {
    breadcrumbItems,
    largeImage,
    smallImage,
    loading,
    clinicData
    } = useDetailKlinik();

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
                <CardDetailKlinik
                    title="Daftar Klinik"
                    data={{
                        nama: clinicData?.name || "",
                        kodeKlinik: clinicData?.code || "",
                        deskripsi: clinicData?.description || "",
                        aksi: {
                            hapusLink: "#",
                            ubahLink: "#",
                        },
                    }}
                />
            </Box>

            <Box mt={3}>
                <CardOperasional
                    title="Jam Operasional"
                    data={clinicData?.operationalSchedule || {
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
