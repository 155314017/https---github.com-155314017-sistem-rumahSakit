import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFacilityByIdService } from "../../../services/ManageFacility/GetFacilityByIdService";
import Cookies from "js-cookie";
import axios from "axios";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetScheduleByTypeId, ScheduleDataItem } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
import { convertToOperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";


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
  schedules: ScheduleDataItem[];
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
  const [deletedItems, setDeletedItems] = useState<string>("");
  const [open, setOpen] = useState(false);
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const facilityResponse = await getFacilityByIdService(id || "");
      const scheduleResponse = await GetScheduleByTypeId(id || "");

      if (facilityResponse) {
        const facilityDataWithSchedule: FacilityDataItem = {
          ...facilityResponse,
          schedules: scheduleResponse,
          operationalSchedule: convertToOperationalSchedule(scheduleResponse)
        };

        setBuildingId(facilityResponse.masterBuildingId || '');
        setFacilityData(facilityDataWithSchedule);

        // Handle images
        const imageResponse = await GetImageByParentId(facilityResponse.id);
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

  const handleDeleteSuccess = () => {
    setOpen(false);
    navigate("/fasilitas", { state: { successDelete: true, message: "Fasilitas berhasil dihapus!" } });
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, facilityId: string) => {
    event.preventDefault();
    setDeletedItems(facilityId);
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
    facilityData,
    buildingName,
    setOpen,
    navigate,
    setDeletedItems,
    setBuildingId,
    setFacilityData,
    setBuildingName,
    id
  };
}
