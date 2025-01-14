import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClinic } from "../../../services/Admin Tenant/ManageClinic/GetClinic";
import dayjs from "dayjs";

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
  schedules: ScheduleData[];
  operationalSchedule?: OperationalSchedule;
};

type OperationalSchedule = {
  senin: string;
  selasa: string;
  rabu: string;
  kamis: string;
  jumat: string;
  sabtu: string;
  minggu: string;
};

export default function useDetailKlinik() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deletedItems, setDeletedItems] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [ids, setIds] = useState<string>("");
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

  
    return defaultSchedule;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const clinicResponse = await getClinic(id); 
      const data = clinicResponse; // Access the data from the response
      setIds(data.id);
      setName(data.name);
      setDescription(data.description || ""); 
      const operationalSchedule = convertSchedulesToReadableList(data.schedules);
      setClinicData({ ...data, operationalSchedule});
      const imagesData = data.images || [];
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



  return {
    name,
    breadcrumbItems,
    largeImage,
    smallImage,
    handleDeleteSuccess,
    confirmationDelete,
    loading,
    description,
    deletedItems,
    setOpen,
    navigate,
    open,
    ids,
    clinicData,
    
  };
}
