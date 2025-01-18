import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import axios from "axios";
import { GetCounterByIdServices } from "../../../services/Admin Tenant/ManageCounter/GetCounterById";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
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
export interface CounterDataItem {
    id: string;
    masterTypeId: string;
    name: string;
    location: string;
    additionalInfo: string;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string | null;
    updatedDateTime: number | null;
    deletedBy: string | null;
    deletedDateTime: number | null;
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
export default function useDetailKonter() {
    

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deletedItems, setDeletedItems] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [largeImage, setLargeImage] = useState<string>("");
    const [smallImage, setSmallImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [counterData, setCounterData] = useState<CounterDataItem | null>(null); 
    const [buildingName, setBuildingName] = useState('');
    const [buildingId, setBuildingId] = useState('');

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
                const accessToken = Cookies.get("accessToken");
                const counterResponse = await GetCounterByIdServices(id, accessToken); 
                const data = counterResponse;
                const operationalSchedule = convertSchedulesToReadableList(data?.schedules || []);
                setCounterData({ 
                    ...data,
                    operationalSchedule 
                } as CounterDataItem);
                setName(data.name);

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
          navigate("/gedung", { state: { successDelete: true, message: "Gedung berhasil dihapus!" } });
        };
      
        const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
          event.preventDefault();
          setDeletedItems(buildingId);
          setOpen(true);
        };

        useEffect(() => {
            const fetchDataBuildings = async () => {
                try {
                    const token = Cookies.get("accessToken");
                    const response = await axios.get(
                        `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building/${buildingId}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                accessToken: `${token}`,
                            }
                        }
                    );
                    setBuildingName(response.data.data.name)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchDataBuildings();
        }, [buildingId]);
  return {
    breadcrumbItems,
    largeImage,
    smallImage,
    loading,
    confirmationDelete,
    open,
    handleDeleteSuccess,
    name,
    description,
    deletedItems,
    navigate,
    counterData,
    buildingName,
    buildingId,
    setDescription,
    setBuildingId
  }
}
