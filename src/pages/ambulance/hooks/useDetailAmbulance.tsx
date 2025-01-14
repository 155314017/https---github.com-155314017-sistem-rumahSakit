import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getAmbulanceByIdService } from "../../../services/Admin Tenant/ManageAmbulance/GetAmbulanceByIdService";

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
  const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deletedItems, setDeletedItems] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [ids, setIds] = useState<string>("") || "";
    const [response, setResponse] = useState<AmbulanceDataItem | null>(null); // Correct type for response
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
            const data = ambulanceResponse; // Access the data from the response
            const operationalSchedule = convertSchedulesToReadableList(data?.schedules || []);
            setAmbulanceData({ ...data, operationalSchedule} as AmbulanceDataItem);
            const imagesData = data?.images || [];
            const mappedImages = imagesData.map((image: ImageData) => ({
              imageName: image.imageName,
              imageType: image.imageType,
              imageData: `data:${image.imageType};base64,${image.imageData}`,
            }));
      
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
      
      
        console.log(response);
      
        return {
          name,
          breadcrumbItems,
          largeImage,
          smallImage,
          handleDeleteSuccess,
          confirmationDelete,
          
          ambulanceData
        };
}
