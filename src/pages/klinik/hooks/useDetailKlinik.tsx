import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClinic } from "../../../services/Admin Tenant/ManageClinic/GetClinic";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetScheduleByTypeId, ScheduleDataItem } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
import { OperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";
import { convertToOperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";

// Image data type
type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
};

// Clinic data type
type ClinicDataItem = {
  id: string;
  name: string;
  description: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  images: ImageData[];
  schedules: ScheduleDataItem[];
  operationalSchedule?: OperationalSchedule;
  code: string;
};

export default function useDetailKlinik() {
  const [deletedItems, setDeletedItems] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImage, setSmallImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [clinicData, setClinicData] = useState<ClinicDataItem | null>(null);

  const breadcrumbItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Klinik",
      href: "/Klinik",
    },
    {
      label: "Detail Klinik",
      href: "/detailKlinik",
    },
  ];
  const fetchData = async () => {
    setLoading(true);
    try {
      const clinicResponse = await getClinic(id);
      const scheduleResponse = await GetScheduleByTypeId(id || "");

      if (clinicResponse) {
        const clinicData: ClinicDataItem = {
          ...clinicResponse,
          schedules: scheduleResponse,
          operationalSchedule: convertToOperationalSchedule(scheduleResponse)
        };

        setClinicData(clinicData);

        const imageResponse = await GetImageByParentId(clinicResponse.id);
        const { largeImage, smallImages } = processImageResponse(imageResponse);
        setLargeImage(largeImage);
        setSmallImages(smallImages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

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
    breadcrumbItems,
    largeImage,
    smallImage,
    loading,
    clinicData,
    confirmationDelete,
    handleDeleteSuccess,
    deletedItems,
    open,
  };
}
