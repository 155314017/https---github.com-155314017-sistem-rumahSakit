
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
};

export default function useDetailGedung() {
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
        const mappedImages = imagesData.map((image: ImageData) => ({
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
  
  return {
    name,
    address,
    deletedItems,
    open,
    ids,
    breadcrumbItems,
    largeImage,
    smallImage,
    loading,
    confirmationDelete,
    handleDeleteSuccess,
    navigate,
    setOpen
  }
}
