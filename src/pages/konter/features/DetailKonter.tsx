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
        smallImage,
        loading,
        confirmationDelete,
        open,
        handleDeleteSuccess,
        name,
        description,
        deletedItems,
        navigate,
        counterData,
    }=useDetailKonter();
    
  return (
    <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <ImageGrid largeImage={largeImage} smallImages={smallImage} loading={false} />
            </Box>

            <Box mt={3}>
                <CardDetail
                    title={name} // Replace with the actual building name
                    columns={[
                        { id: "nomorKonter", label: "No. Konter" },
                        { id: "tipeKonter", label: "Tipe Konter" },
                        { id: "lokasiKonter", label: "Lokasi Konter" },
                        
                    ]}
                    data={[{ nomorKonter: counterData?.id, tipeKonter: counterData?.additionalInfo, lokasiKonter: counterData?.location }]}
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
  )
}
