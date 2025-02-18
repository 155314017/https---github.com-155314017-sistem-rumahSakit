import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetScheduleByTypeId, ScheduleDataItem } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
import { convertToOperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";
import { GetCounterByIdServices } from "../../../services/Admin Tenant/ManageCounter/GetCounterById";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";
import { useFetchData } from "../../../hooks/useFetchData";
import { CounterDataItem } from "../../../types/counter.types";

export default function useDetailKonter() {
  const [deletedItems, setDeletedItems] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImage, setSmallImages] = useState<string[]>([]);
  const [counterData, setCounterData] = useState<CounterDataItem | null>(null);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Konter", href: "/konter" },
    { label: "Detail Konter", href: "/detailKonter" },
  ];

  const { data: counterDataResponse, loading: loadingCounterData, error: counterError } = useFetchData<CounterDataItem>(
    GetCounterByIdServices,
    [id],
    true
  );

  const { data: scheduleResponse, loading: loadingScheduleData, error: scheduleError } = useFetchData(
    GetScheduleByTypeId,
    [id],
    true
  );

  const { data: imageData, refetch: refetchImage } = useFetchData(
    GetImageByParentId,
    [counterDataResponse.id],
    false,
    true
  );

  useEffect(() => {
    if (counterDataResponse && scheduleResponse) {
      const counterData: CounterDataItem = {
        ...counterDataResponse,
        schedules: scheduleResponse as ScheduleDataItem[],
        operationalSchedule: convertToOperationalSchedule(scheduleResponse as ScheduleDataItem[]),
      };
      setCounterData(counterData);
    }
    if (counterDataResponse.id) {
      refetchImage();
    }
  }, [counterDataResponse, scheduleResponse]);

  useEffect(() => {
    if (imageData) {
      const { largeImage, smallImages } = processImageResponse(imageData);
      setLargeImage(largeImage);
      setSmallImages(smallImages);
    }

  }, [imageData])


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
    loading: loadingCounterData || loadingScheduleData,
    deletedItems,
    setOpen,
    navigate,
    open,
    counterData,
    id,
    counterError,
    scheduleError,
  };
}
