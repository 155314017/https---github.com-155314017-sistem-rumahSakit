import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetBuildingById } from "../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";


export default function useDetailGedung() {
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [deletedItems, setDeletedItems] = useState("");
    const [open, setOpen] = useState(false);
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
        const buildingResponse = await GetBuildingById(id || "");
        setName(buildingResponse.name);
        setAddress(buildingResponse.address);

        if (buildingResponse.id) {
          const imageResponse = await GetImageByParentId(buildingResponse.id);
          const { largeImage, smallImages } = processImageResponse(imageResponse);
          setLargeImage(largeImage);
          setSmallImages(smallImages);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
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
    breadcrumbItems,
    largeImage,
    smallImage,
    loading,
    confirmationDelete,
    handleDeleteSuccess,
    navigate,
    setOpen,
    id
  }
}
