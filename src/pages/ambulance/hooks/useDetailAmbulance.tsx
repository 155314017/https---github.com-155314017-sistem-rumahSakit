import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAmbulanceByIdService } from "../../../services/Admin Tenant/ManageAmbulance/GetAmbulanceByIdService";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetScheduleByTypeId, ScheduleDataItem } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
import { OperationalSchedule, convertToOperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";

// Image data type
type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
};

// Ambulance data type
type AmbulanceDataItem = {
  id: string;
  number: string;
  status: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  cost: number;
  images: ImageData[];
  schedules: ScheduleDataItem[];
  operationalSchedule?: OperationalSchedule;
}

export default function useDetailAmbulance() {
    const [deletedItems, setDeletedItems] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [largeImage, setLargeImage] = useState<string>("");
    const [smallImage, setSmallImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [ambulanceData, setAmbulanceData] = useState<AmbulanceDataItem | null>(null);
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
        },
    ];

    const fetchData = async () => {
      setLoading(true);
      try {
        const ambulanceResponse = await getAmbulanceByIdService(id); 
        const scheduleResponse = await GetScheduleByTypeId(id || "");
        console.log("Schedule Response from API:", scheduleResponse);
        
        if (ambulanceResponse) {
          const ambulanceData: AmbulanceDataItem = {
            ...ambulanceResponse,
            schedules: scheduleResponse,
            operationalSchedule: convertToOperationalSchedule(scheduleResponse)
          };
          
          setAmbulanceData(ambulanceData);

          const imageResponse = await GetImageByParentId(ambulanceData.id);
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
      navigate("/ambulance", { state: { successDelete: true, message: "Gedung berhasil dihapus!" } });
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
      open,
      loading,
      deletedItems,
      ambulanceData,
    };
}
