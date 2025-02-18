/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFacilityByIdService } from "../../../services/Admin Tenant/ManageFacility/GetFacilityByIdService";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetScheduleByTypeId, ScheduleDataItem } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
import { convertToOperationalSchedule } from "../../../services/Admin Tenant/ManageSchedule/ScheduleUtils";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";
import { GetBuildingById } from "../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices";
import { FacilityDataItem } from "../../../types/Facility.types";
import { useFetchData } from "../../../hooks/useFetchData";
import { BuildingDataItem } from "../../../types/building.types";
import { ImageDataItems } from "../../../types/images.types";




export default function useDetailFasilitas() {
  const [deletedItems, setDeletedItems] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImage, setSmallImages] = useState<string[]>([]);
  const [buildingName, setBuildingName] = useState('');
  const [buildingId, setBuildingId] = useState('');
  const [facilityData, setFacilityData] = useState<FacilityDataItem>();

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

  const { data: facilityDataResponse, loading: loading } = useFetchData<FacilityDataItem>(
    getFacilityByIdService,
    [id],
    true
  );

  const { data: scheduleResponse, loading: loadingScheduleData } = useFetchData(
    GetScheduleByTypeId,
    [id],
    true
  );

  const { data: imageData, refetch: refetchImage } = useFetchData<ImageDataItems>(
    GetImageByParentId,
    [facilityDataResponse.id],
    false,
    true
  );

  const { data: buildingDataResponse, loading: loadingBuilding, refetch: refetchBuilding } = useFetchData<BuildingDataItem>(
    GetBuildingById,
    [buildingId],
    false
  );

  useEffect(() => {
    if (facilityDataResponse && scheduleResponse) {
      const facilityData: FacilityDataItem = {
        ...facilityDataResponse,
        schedules: scheduleResponse as ScheduleDataItem[],
        operationalSchedule: convertToOperationalSchedule(scheduleResponse as ScheduleDataItem[]),
      };
      console.log(facilityDataResponse)
      setFacilityData(facilityData);
      setBuildingId(facilityDataResponse.masterBuildingId);
    }
    if (facilityDataResponse.id) {
      refetchImage();
    }
  }, [facilityDataResponse, scheduleResponse]);


  useEffect(() => {
    if (imageData) {
      const { largeImage, smallImages } = processImageResponse(imageData);
      setLargeImage(largeImage);
      setSmallImages(smallImages);
    }

  }, [imageData])

  useEffect(() => {
    if (buildingId) {
      refetchBuilding();
      setBuildingName(buildingDataResponse.name);
    }
  }, [buildingId])

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
    loading: loadingBuilding || loading || loadingScheduleData,
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
