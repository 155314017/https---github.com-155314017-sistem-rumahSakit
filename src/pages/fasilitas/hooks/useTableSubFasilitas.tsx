/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import { SubFacilityServices, SubFacilityDataItem } from "../../../services/ManageSubFacility/SubFacility";
import { useNavigate } from "react-router-dom";
import { GetScheduleByTypeId } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
// Define the interfaces



// Custom hook
export default function useTableSubFasilitas(fetchDatas: () => void, onSuccessDelete: () => void) {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const [datas, setDatas] = useState<SubFacilityDataItem[]>([]);
  const [dataIdFacility, setDataIdFacility] = useState<string[]>([]);
  const [deletedItems, setDeletedItems] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFac, setIsLoadingFac] = useState(false);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [dataSchedules, setDataSchedules] = useState<any[]>([])
  const navigate = useNavigate();
  // Fetch data for the sub-facilities
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await SubFacilityServices();
      const allSchedules = [];
      const dataSchedules = [];

      for (let index = 0; index < result.length; index++) {
        const hasil = await GetScheduleByTypeId(result[index].id);
        console.log('hasil: ', hasil);
        const schedules = [];
        const formattedSchedules = [];

        for (let scheduleIndex = 0; scheduleIndex < hasil.length; scheduleIndex++) {
          const formatTime = (timeArray: string | any[]) => {
            const hours = String(timeArray[0]).padStart(2, '0');
            const minutes = String(timeArray[1]).padStart(2, '0');
            return `${hours}:${minutes}`;
          };

          const startTimeFormatted = formatTime(hasil[scheduleIndex].startTime);
          const endTimeFormatted = formatTime(hasil[scheduleIndex].endTime);
          formattedSchedules.push(`${startTimeFormatted} - ${endTimeFormatted}`);
          schedules.push({
            startTime: startTimeFormatted,
            endTime: endTimeFormatted,
          });
        }
        allSchedules.push({
          id: result[index].id,
          schedules: schedules,
        });

        dataSchedules.push({
          id: result[index].id,
          operationalSchedule: formattedSchedules.join(' / '),
        });
      }
      setDatas(result);
      setDataSchedules(dataSchedules);
      const facilityIds = result.map((data) => data.facilityDataId);
      setDataIdFacility(facilityIds);
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch data from API: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch facilities for each sub-facility
  useEffect(() => {
    if (dataIdFacility.length > 0) {
      setIsLoadingFac(true);
      const fetchFacilities = async () => {
        try {
          const responses = await Promise.all(
            dataIdFacility.map((id) => axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/facility/${id}`))
          );

          const facilitiesData = responses.map((response) => response.data.data.name);
          setFacilities(facilitiesData);
          setIsLoadingFac(false);
        } catch (err) {
          console.error('Error:', err);
          setIsLoadingFac(false);
        }
      };

      fetchFacilities();
    }
  }, [dataIdFacility]);

  // Pagination logic
  const rowsPerPage = 10;
  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Sorting options
  const urutkan = [
    { value: 1, label: "Biaya penanganan tertinggi" },
    { value: 2, label: "Biaya penanganan terendah" },
    { value: 3, label: "Nama fasilitas A-Z" },
    { value: 4, label: "Nama fasilitas Z-A" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault();
    setDeletedItems(buildingId);
    setOpen(true);
  };

  const handleDeleteSuccess = () => {
    onSuccessDelete();
    fetchDatas(); // Call the fetchDatas prop to refresh data
    fetchData();   // Refresh local data state
  };

  return {
    page,
    isCollapsed,
    open,
    datas,
    deletedItems,
    facilities,
    isLoading,
    isLoadingFac,
    displayedData,
    urutkan,
    handleChangePage,
    toggleCollapse,
    confirmationDelete,
    handleDeleteSuccess,
    navigate,
    setOpen,
    rowsPerPage,
    dataSchedules
  };
}
