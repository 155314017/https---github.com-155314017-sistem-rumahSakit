import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAmbulanceByIdService } from "../../../services/Admin Tenant/ManageAmbulance/GetAmbulanceByIdService";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";
import { AmbulanceDataItem } from "../../../types/ambulance.types";
import { useFetchData } from "../../../hooks/useFetchData";

// Image data type
interface UseDetailAmbulanceReturn {
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
  ambulanceError: Error | null;
  imageError: Error | null;
  ambulanceDataItem: AmbulanceDataItem | null;
}
export default function useDetailAmbulance(): UseDetailAmbulanceReturn {
    const { id } = useParams();
    const navigate = useNavigate();
    
  const { data: ambulanceDataItem, loading: ambulanceLoading, error: ambulanceError } = useFetchData<AmbulanceDataItem>(
      getAmbulanceByIdService,
      [id],
      true,
    );

    const { data: imageData, loading: imageLoading, error: imageError, refetch: refetchImage } = useFetchData(
      GetImageByParentId,
      [ambulanceDataItem?.id],
      false,
      true
    );
    

  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImages, setSmallImages] = useState<string[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const [open, setOpen] = useState(false);
    
  useEffect(() => {
    if (ambulanceDataItem) {
      if (ambulanceDataItem.id) {
        refetchImage();
      }
    }
  }, [ambulanceDataItem, refetchImage]);

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
      label: "Ambulance",
      href: "/ambulance",
    },
    {
      label: "Detail Ambulance",
      href: "/detailAmbulance",
    },];
    
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
      deletedItems,
      open,
      breadcrumbItems,
      largeImage,
      smallImages,
      loading: ambulanceLoading || imageLoading,
      confirmationDelete,
      handleDeleteSuccess,
      navigate,
      setOpen,
      id,
      ambulanceError,
      imageError,
      ambulanceDataItem,
    };
}
