import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/imageComponent/ImageGrid";
import { Link } from "@mui/material";
import CardOperasionalKlinik from "../../../components/small/card/CardOperasional";
import CardDetail from "../../../components/small/card/CardDetail";



//hooks
import useDetailKonter from "../hooks/useDetailKonter";
export default function DetailKonter() {
    const {
        breadcrumbItems,
    largeImage,
    smallImages
    }=useDetailKonter();
    
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
  )
}
