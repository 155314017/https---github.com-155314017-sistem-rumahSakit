import React, { useState, useEffect } from "react";
import { Clinic, ClinicDataItem } from "../../../services/Admin Tenant/ManageClinic/Clinic";
import { useNavigate } from "react-router-dom";
import { GetScheduleByTypeId } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";


export default function useTableKlinik(fetchDatas: () => void, onSuccessDelete: () => void) {
    const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [datas, setDatas] = useState<ClinicDataItem[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const [dataSchedules, setDataSchedules] = useState<any[]>([])

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await Clinic();
      const allSchedules = []; // Array untuk menyimpan semua jadwal
            const dataSchedules = []; // Array untuk menyimpan jadwal terpisah
      
            // Loop untuk setiap id dari hasil AmbulanceServices
            for (let index = 0; index < result.length; index++) {
              console.log('id ke-', index, ': ', result[index].id);
              const hasil = await GetScheduleByTypeId(result[index].id);
              console.log('data schedule: ', hasil);
      
              // Array untuk menyimpan jadwal startTime dan endTime per id
              const schedules = [];
              const formattedSchedules = []; // Array untuk menyimpan jadwal yang sudah diformat
      
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
      
            console.log('Formatted Schedules:', dataSchedules);
      setDatas(result); 
      setDataSchedules(dataSchedules);
    } catch (error) {
      console.error('Failed to fetch data from API: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {

    event.preventDefault();
    setDeletedItems(buildingId);
    setOpen(true);
  };

  const handleDeleteSuccess = () => {
    onSuccessDelete();
    fetchDatas();
    fetchData();
  };

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;

  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const urutkan = [
    { value: 1, label: "Nomor klinik 1-9" },
    { value: 2, label: "Nomorklinik 9-1" },
    { value: 3, label: "Nama klinik A-Z" },
    { value: 4, label: "Nama klinik Z-A" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return{
    page,
    setPage,
    isCollapsed,
    setIsCollapsed,
    open,
    setOpen,
    datas,
    setDatas,
    deletedItems,
    setDeletedItems,
    confirmationDelete,
    handleDeleteSuccess,
    handleChangePage,
    rowsPerPage,
    displayedData,
    urutkan,
    toggleCollapse,
    navigate,
    dataSchedules
  }
}
