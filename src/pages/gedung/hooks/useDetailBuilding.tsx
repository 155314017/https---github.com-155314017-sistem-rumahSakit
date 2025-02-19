import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetBuildingById } from "../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";
import { useFetchData } from "../../../hooks/useFetchData";
import { BuildingDataItem } from "../../../types/building.types";

interface useDetailBuildingReturn {
  name: string;
  address: string;
  deletedItems: string;
  open: boolean;
  breadcrumbItems: { label: string; href: string }[];
  largeImage: string;
  smallImages: string[];
  loading: boolean;
  confirmationDelete: (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => void;
  handleDeleteSuccess: () => void;
  navigate: ReturnType<typeof useNavigate>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | undefined;
  buildingError: Error | null;
  imageError: Error | null;
}

export default function useDetailBuilding(): useDetailBuildingReturn {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: buildingData, loading: buildingLoading, error: buildingError } = useFetchData<BuildingDataItem>(
    GetBuildingById,
    [id],
    true,
  );

  // Fetch image data using useFetchData hook
  const { data: imageData, loading: imageLoading, error: imageError, refetch: refetchImage } = useFetchData(
    GetImageByParentId,
    [buildingData?.id],
    false,
    true
  );

  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImages, setSmallImages] = useState<string[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (buildingData) {
      setName(buildingData.name);
      setAddress(buildingData.address);
      if (buildingData.id) {
        refetchImage();
      }
    }
  }, [buildingData, refetchImage]);


  useEffect(() => {
    if (imageData) {
      const { largeImage, smallImages } = processImageResponse(imageData);
      setLargeImage(largeImage);
      setSmallImages(smallImages || []);
    }
  }, [imageData]);

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
    smallImages,
    loading: buildingLoading || imageLoading,
    confirmationDelete,
    handleDeleteSuccess,
    navigate,
    setOpen,
    id,
    buildingError,
    imageError,
  };
}
