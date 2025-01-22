import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getAmbulanceByIdService } from "../../../services/Admin Tenant/ManageAmbulance/GetAmbulanceByIdService";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetScheduleByTypeId, ScheduleDataItem } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";

// Image data type
type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
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
    
    const convertSchedulesToReadableList = (schedules: ScheduleDataItem[]): OperationalSchedule => {
      console.log("Schedules masuk ke convert:", schedules);
      
      const defaultSchedule: OperationalSchedule = {
        senin: "-",
        selasa: "-",
        rabu: "-",
        kamis: "-",
        jumat: "-",
        sabtu: "-",
        minggu: "-",
      };

      schedules.forEach((schedule) => {
        console.log("Processing schedule:", schedule);
        // Format waktu dari array ke string
        const startTime = `${String(schedule.startTime[0]).padStart(2, '0')}:${String(schedule.startTime[1]).padStart(2, '0')}`;
        const endTime = `${String(schedule.endTime[0]).padStart(2, '0')}:${String(schedule.endTime[1]).padStart(2, '0')}`;
        const timeRange = `${startTime} - ${endTime}`;
        console.log("Time range:", timeRange);
        console.log("Days status:", {
          monday: schedule.monday,
          tuesday: schedule.tuesday,
          wednesday: schedule.wednesday,
          thursday: schedule.thursday,
          friday: schedule.friday,
          saturday: schedule.saturday,
          sunday: schedule.sunday
        });

        // Set jadwal berdasarkan hari yang aktif
        if (schedule.monday) defaultSchedule.senin = timeRange;
        if (schedule.tuesday) defaultSchedule.selasa = timeRange;
        if (schedule.wednesday) defaultSchedule.rabu = timeRange;
        if (schedule.thursday) defaultSchedule.kamis = timeRange;
        if (schedule.friday) defaultSchedule.jumat = timeRange;
        if (schedule.saturday) defaultSchedule.sabtu = timeRange;
        if (schedule.sunday) defaultSchedule.minggu = timeRange;
      });

      console.log("Final schedule:", defaultSchedule);
      return defaultSchedule;
    };

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
            operationalSchedule: convertSchedulesToReadableList(scheduleResponse)
          };
          
          console.log(ambulanceData);
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
