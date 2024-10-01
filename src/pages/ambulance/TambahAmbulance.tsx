import { Container, Box } from "@mui/system";
import { Typography } from "@mui/material";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageUploader from "../../components/medium/ImageUploader";

interface ImageInfo {
  file: File;
  preview: string;
  name: string;
  size: string;
}

export default function TambahAmbulance() {
  const handleImagesSelected = (images: ImageInfo[]) => {
    console.log("Selected images:", images);
  };

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
      label: "Tambah Ambulance",
      href: "/tambahAmbulance",
    },
  ];

  return (
    <Container sx={{ py: 2 }}>
      <BreadCrumbs
        breadcrumbItems={breadcrumbItems}
        onBackClick={() => window.history.back()}
      />

      <Box mt={3}>
        <Box
          position="relative"
          p={3}
          sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}
        >
          <Typography fontSize="20px" fontWeight="700">
            Tambah Ambulance
          </Typography>

          {/* membuat bentuk lengkung atas */}
          <Box
            position={"absolute"}
            sx={{
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
            }}
          >
            {/* lengkung kiri */}
            <Box
              sx={{
                width: "50px",
                height: "30px",
                bgcolor: "#F1F0FE",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "30px",
                  bgcolor: "#fff",
                  borderRadius: "0px 15px 0px 0px ",
                }}
              />
            </Box>

            {/* kotak tengah */}
            <Box
              sx={{
                width: "600px",
                height: "50px",
                bgcolor: "#F1F0FE",
                borderRadius: "0px 0px 22px 22px",
              }}
            />

            {/* lengkung kanan */}
            <Box
              sx={{
                width: "50px",
                height: "30px",
                bgcolor: "#F1F0FE",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "30px",
                  bgcolor: "#fff",
                  borderRadius: "15px 0px 0px 0px ",
                }}
              />
            </Box>
          </Box>
          {/* ---------- */}

          {/* image uploader */}
          <ImageUploader onImagesSelected={handleImagesSelected} />
        </Box>
      </Box>
    </Container>
  );
}
