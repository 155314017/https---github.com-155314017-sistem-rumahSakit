import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetBuildingById } from "../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";


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
        const buildingResponse = await GetBuildingById(id, token);
        setIds(buildingResponse.id);
        setName(buildingResponse.name);
        setAddress(buildingResponse.address);

        if (buildingResponse.id) {
          const imageResponse = await GetImageByParentId(buildingResponse.id);
          if (imageResponse?.data?.length > 0) {
            setLargeImage(`data:${imageResponse.data[0].imageType};base64,${imageResponse.data[0].imageData}`);
            setSmallImages(imageResponse.data.map((img) => 
              `data:${img.imageType};base64,${img.imageData}`
            ));
          } else {
            setLargeImage("");
            setSmallImages([]);
          }
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
