import { Container, Box } from "@mui/system";
import { Link } from "@mui/material";

import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageGrid from "../../components/medium/ImageGrid";
import CardDetail from "../../components/medium/CardDetail";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ModalDeleteConfirmation from "../../components/small/ModalDeleteConfirmation";

type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
};

export default function DetailGedung() {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [deletedItems, setDeletedItems] = useState("");
  const [open, setOpen] = useState(false);
  const [ids, setIds] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImage, setSmallImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get(
        `https://hms.3dolphinsocial.com:8083/v1/manage/building/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            accessToken: `${token}`,
          }
        }
      );
      setIds(response.data.data.id);
      setName(response.data.data.name);
      setAddress(response.data.data.address);
      const imagesData = response.data.data.images;
      const mappedImages = imagesData.map((image: any) => ({
        imageName: image.imageName,
        imageType: image.imageType,
        imageData: `data:${image.imageType};base64,${image.imageData}`,
      }));

      const largeImage = mappedImages[0]?.imageData || null;
      const smallImages = mappedImages.slice(1).map((img: ImageData) => img.imageData);

      setLargeImage(largeImage); 
      setSmallImages(smallImages);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDeleteSuccess = () => {
    setOpen(false);
    navigate('/gedung', { state: { successDelete: true, message: 'Gedung berhasil dihapus!' } });
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault();
    setDeletedItems(buildingId);
    setOpen(true);
  };

  return (
    <Container sx={{ py: 2 }}>
      <BreadCrumbs
        breadcrumbItems={breadcrumbItems}
        onBackClick={() => window.history.back()}
      />
      <Box mt={3}>
        <ImageGrid largeImage={largeImage} smallImages={smallImage} loading={loading}  />
      </Box>

      <Box mt={3}>
        <CardDetail
          title={`Gedung ${name}`}
          columns={[
            { id: "nomor", label: "No. Gedung" },
            { id: "alamatGedung", label: "Alamat Gedung" },
          ]}
          data={[
            {
              nomor: "K 204",
              alamatGedung: address,
              aksi: {
                hapusLink: "#",
                ubahLink: "",
              },
            },
          ]}
          actions={() => (
            <>
              <ModalDeleteConfirmation
                open={open}
                onClose={() => setOpen(false)}
                apiUrl={`https://hms.3dolphinsocial.com:8083/v1/manage/building/${deletedItems}`}
                onDeleteSuccess={handleDeleteSuccess}
              />
              <Link
                underline="hover"
                sx={{ color: "#8F85F3" }}
                href="#"
                onClick={(event) => confirmationDelete(event, ids)}
              >
                Hapus
              </Link>
              <Link
                underline="hover"
                sx={{ color: "#8F85F3" }}
                href="#"
                onClick={() => navigate(`/editGedung/${ids}`)}
              >
                Ubah
              </Link>
            </>
          )}
        />
      </Box>
    </Container>
  );
}
