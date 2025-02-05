import { Container, Box } from "@mui/system";
import { Link } from "@mui/material";

// components
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/imageComponent/ImageGrid";
import CardDetail from "../../../components/small/card/CardDetail";

// hooks
import useDetailAmbulance from "../hooks/useDetailAmbulance";
import CardOperasionalKlinik from "../../../components/small/card/CardOperasional";
export default function DetailAmbulance() {
  const {

    breadcrumbItems,
    largeImage,
    smallImage,
    ambulanceData
  } = useDetailAmbulance()
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
          title={ambulanceData?.number}
          columns={[
            { id: "biaya", label: "Biaya" },
          ]}
          data={[{ biaya: ambulanceData?.cost }]}
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
          data={ambulanceData?.operationalSchedule || {
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
