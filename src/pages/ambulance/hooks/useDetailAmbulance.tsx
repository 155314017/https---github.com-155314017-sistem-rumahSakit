import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAmbulanceByIdService } from "../../../services/Admin Tenant/ManageAmbulance/GetAmbulanceByIdService";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetScheduleByTypeId, ScheduleDataItem } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
import { OperationalSchedule, convertToOperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";

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
    const { id } = useParams();
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
    
    
    
    
    
    return {
    breadcrumbItems,
    largeImage,
    smallImage,
    ambulanceData,
    loading
    };
}
