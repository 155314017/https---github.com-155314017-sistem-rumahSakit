import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClinic } from "../../../services/Admin Tenant/ManageClinic/GetClinic";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetScheduleByTypeId, ScheduleDataItem } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
import { OperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";
import { convertToOperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";

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
      label: "Gedung",
      href: "/Klinik",
    },
    {
      label: "Detail Gedung",
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
        console.log("Image Response from API:", imageResponse);
        if (imageResponse?.data?.length > 0) {
          setLargeImage(`data:${imageResponse.data[0].imageType};base64,${imageResponse.data[0].imageData}`);
          setSmallImages(imageResponse.data.slice(1).map((img) =>
            `data:${img.imageType};base64,${img.imageData}`
          ));
        } else {
          setLargeImage("");
          setSmallImages([]);
        }
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
    navigate("/gedung", { state: { successDelete: true, message: "Gedung berhasil dihapus!" } });
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault();
    setDeletedItems(buildingId);
    setOpen(true);
  };



  return {
    breadcrumbItems,
    largeImage,
    smallImage,
    handleDeleteSuccess,
    confirmationDelete,
    loading,
    deletedItems,
    setOpen,
    navigate,
    open,
    clinicData,
  };
}
