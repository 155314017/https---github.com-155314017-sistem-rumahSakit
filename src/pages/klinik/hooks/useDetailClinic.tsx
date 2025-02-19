import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";
import { ClinicDataItem } from "../../../types/clinic.types";
import { getClinicByIdService } from "../../../services/Admin Tenant/ManageClinic/GetClinicByIdService";
import { useFetchData } from "../../../hooks/useFetchData";
import { GetScheduleByTypeId } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
import { convertToOperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";

// Interface return type
interface UseDetailClinicReturn {
  name: string;
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
  clinicError: Error | null;
  imageError: Error | null;
  clinicData: ClinicDataItem | null;
}

export default function useDetailClinic(): UseDetailClinicReturn {
  const { id } = useParams();
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Klinik", href: "/Klinik" },
    { label: "Detail Klinik", href: "/DetailClinic" },
  ];

  const { data: clinicData, loading: clinicLoading, error: clinicError } = useFetchData<ClinicDataItem>(
    getClinicByIdService,
    [id],
    true
  );

  const { data: imageData, loading: imageLoading, error: imageError, refetch: refetchImage } = useFetchData(
    GetImageByParentId,
    [clinicData?.id],
    false,
    true
  );

  const [name, setName] = useState<string>("");
  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImages, setSmallImages] = useState<string[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clinicData) {
      setName(clinicData.name);
      if (clinicData.id) {
        refetchImage();
        fetchData();
      }
    }
  }, [clinicData, refetchImage]);

  useEffect(() => {
    if (imageData) {
      const { largeImage, smallImages } = processImageResponse(imageData);
      setLargeImage(largeImage);
      setSmallImages(smallImages || []);
    }
  }, [imageData]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const scheduleResponse = await GetScheduleByTypeId(id || "");
      if (clinicData) {
        clinicData.operationalSchedule = convertToOperationalSchedule(scheduleResponse);
      }
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuccess = () => {
    setOpen(false);
    navigate("/klinik", { state: { successDelete: true, message: "Klinik berhasil dihapus!" } });
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, clinicId: string) => {
    event.preventDefault();
    setDeletedItems(clinicId);
    setOpen(true);
  };

  return {
    name,
    deletedItems,
    open,
    breadcrumbItems,
    largeImage,
    smallImages,
    loading: clinicLoading || imageLoading || loading,
    confirmationDelete,
    handleDeleteSuccess,
    navigate,
    setOpen,
    id,
    clinicError,
    imageError,
    clinicData,
  };
}
