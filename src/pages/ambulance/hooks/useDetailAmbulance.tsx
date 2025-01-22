import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getAmbulanceByIdService } from "../../../services/Admin Tenant/ManageAmbulance/GetAmbulanceByIdService";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { getScheduleByTypeId } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";

// Image data type
type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
};


type ScheduleData = {
  id: string;
  startDateTime: number;
  endDateTime: number;
};
// Clinic data type
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
  schedules: ScheduleData[];
  operationalSchedule?: OperationalSchedule;
}



type OperationalSchedule = {
  senin: string;
  selasa: string;
  rabu: string;
  kamis: string;
  jumat: string;
  sabtu: string;
  minggu: string;
};


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
    
      const convertSchedulesToReadableList = (schedules: ScheduleData[]) => {
          const defaultSchedule: OperationalSchedule = {
            senin: "",
            selasa: "",
            rabu: "",
            kamis: "",
            jumat: "",
            sabtu: "",
            minggu: "",
          };
        
          const daysMap: { [key: string]: keyof OperationalSchedule } = {
            Senin: "senin",
            Selasa: "selasa",
            Rabu: "rabu",
            Kamis: "kamis",
            Jumat: "jumat",
            Sabtu: "sabtu",
            Minggu: "minggu",
          };
      
          console.log("masuk convert",schedules);
        
          schedules.forEach((schedule) => {
            const startDay = dayjs(schedule.startDateTime).format("dddd"); // Day in English
            const startTime = dayjs(schedule.startDateTime).format("HH:mm");
            const endTime = dayjs(schedule.endDateTime).format("HH:mm");
      
        
            const mappedDay = daysMap[startDay] || ""; // Map to localized day name
        
            // Only update if mappedDay is valid
            if (mappedDay) {
              defaultSchedule[mappedDay] = `${startTime} - ${endTime}`;
            }
          });
      
          console.log(defaultSchedule);
        
          return defaultSchedule;
        };
      
        const fetchData = async () => {
          setLoading(true);
          try {
            console.log(id);
            const ambulanceResponse = await getAmbulanceByIdService(id); 
            const data = ambulanceResponse; 
            const scheduleResponse = await getScheduleByTypeId(id || "");
            console.log(scheduleResponse);
            setAmbulanceData(data);

            if (data && data.id) {
                const imageResponse = await GetImageByParentId(data.id);
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
