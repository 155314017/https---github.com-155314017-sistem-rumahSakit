import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { GetFacilityByIdServices } from "../../../services/ManageFacility/GetFacilityByIdService";
import Cookies from "js-cookie";
import axios from "axios";
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
export interface FacilityDataItem {
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
    masterBuildingId: string;
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


export default function useDetailFasilitas() {
  const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deletedItems, setDeletedItems] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [ids, setIds] = useState<string>("") || "";
    const { id } = useParams();
    const navigate = useNavigate();
    const [largeImage, setLargeImage] = useState<string>("");
    const [smallImage, setSmallImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [facilityData, setFacilityData] = useState<FacilityDataItem | null>(null);
    const [buildingName, setBuildingName] = useState('');
    const [buildingId, setBuildingId] = useState('');

    const breadcrumbItems = [
        {
          label: "Dashboard",
          href: "/dashboard",
        },
        {
          label: "Fasilitas",
          href: "/fasilitas",
        },
        {
          label: "Detail Fasilitas",
          href: "/detailFasilitas",
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
            const facilityResponse = await GetFacilityByIdServices(id, accessToken); 
            const data = facilityResponse; // Access the data from the response
            const operationalSchedule = convertSchedulesToReadableList(data?.schedules || []);
            setBuildingId(data?.masterBuildingId || '');
            setFacilityData({ ...data, operationalSchedule} as FacilityDataItem);
            const imagesData = data?.images || [];
            const mappedImages = imagesData.map((image: ImageData) => ({
              imageName: image.imageName,
              imageType: image.imageType,
              imageData: `data:${image.imageType};base64,${image.imageData}`,
            }));
            console.log("name", data.name);
            setName(data.name);
      
            setLargeImage(mappedImages[0]?.imageData || "");
            setSmallImages(mappedImages.slice(1).map((img: ImageData) => img.imageData || ""));
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
                        `https://hms.3dolphinsocial.com:8083/v1/manage/building/${buildingId}`,
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
          name,
          breadcrumbItems,
          largeImage,
          smallImage,
          handleDeleteSuccess,
          confirmationDelete,
          loading,
          facilityData,
          deletedItems,
            setOpen,
            navigate,
            open,
            ids,
            buildingName
        };
}
