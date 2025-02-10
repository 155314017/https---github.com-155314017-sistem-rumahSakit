import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetScheduleByTypeId, ScheduleDataItem } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
import { OperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";
import { convertToOperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";
import { GetCounterByIdServices } from "../../../services/Admin Tenant/ManageCounter/GetCounterById";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";



// Clinic data type
type CounterDataItem = {
  id: string;
  name: string;
  location: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  schedules: ScheduleDataItem[];
  operationalSchedule?: OperationalSchedule;
};

export default function useDetailKonter() {
  const [deletedItems, setDeletedItems] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImage, setSmallImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [counterData, setCounterData] = useState<CounterDataItem | null>(null);

  const breadcrumbItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Konter",
      href: "/konter",
    },
    {
      label: "Detail Konter",
      href: "/detailKonter",
    },
  ];
  const fetchData = async () => {
    setLoading(true);
    try {
      const counterResponse = await GetCounterByIdServices(id);
      const scheduleResponse = await GetScheduleByTypeId(id || "");

      if (counterResponse) {
        const counterData: CounterDataItem = {
          ...counterResponse,
          schedules: scheduleResponse,
          operationalSchedule: convertToOperationalSchedule(scheduleResponse)
        };

        setCounterData(counterData);

        const imageResponse = await GetImageByParentId(counterResponse.id);
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
    navigate("/konter", { state: { successDelete: true, message: "Konter berhasil dihapus!" } });
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, counterId: string) => {
    event.preventDefault();
    setDeletedItems(counterId);
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
    counterData,
  };
}
