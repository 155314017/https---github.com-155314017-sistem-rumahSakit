import { Container, Box } from "@mui/system";
import { Link } from "@mui/material";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageGrid from "../../components/medium/ImageGrid";
import CardDetail from "../../components/medium/CardDetail";

export default function DetailAmbulance() {
  const breadcrumbItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Ambulance",
      href: "/ambulance",
    },
    {
      label: "Detail Ambulance",
      href: "/detailAmbulance",
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
          title="AB 1907 BCE"
          columns={[
            { id: "biaya", label: "Biaya" },
            { id: "waktuPelayanan", label: "Waktu Pelayanan" },
          ]}
          data={[{ biaya: "Rp. 100.000", waktuPelayanan: "2 jam" }]}
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
