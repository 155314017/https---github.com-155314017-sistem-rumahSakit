import { Container, Box } from "@mui/system";
import { Link } from "@mui/material";

import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageGrid from "../../components/medium/ImageGrid";
import CardDetail from "../../components/medium/CardDetail";

export default function DetailGedung() {
  const breadcrumbItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Gedung",
      href: "/gedung",
    },
    {
      label: "Detail Gedung",
      href: "/detailGedung",
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
          title="Nama Gedung"
          columns={[
            { id: "biaya", label: "Biaya" },
            { id: "waktuPelayanan", label: "Waktu Pelayanan" },
          ]}
          data={[
            {
              biaya: "K 204",
              waktuPelayanan: "Sayap Timur lt.2",
              aksi: {
                hapusLink: "#",
                ubahLink: "#",
              },
            },
          ]}
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
