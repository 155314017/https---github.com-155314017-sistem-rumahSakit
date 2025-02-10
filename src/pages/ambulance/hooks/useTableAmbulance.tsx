/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AmbulanceServices,
  AmbulanceDataItem
} from '../../../services/Admin Tenant/ManageAmbulance/AmbulanceServices'
import { GetScheduleByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices'





export default function useTableAmbulance(fetchDatas: () => void, onSuccessDelete: () => void) {
  const [page, setPage] = useState(1)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [open, setOpen] = useState(false)
  // const [data, setData] = useState<AmbulanceDataItem[]>([]);
  const [datas, setDatas] = useState<AmbulanceDataItem[]>([])
  const [dataSchedules, setDataSchedules] = useState<any[]>([])
  const [deletedItems, setDeletedItems] = useState('')

  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const result = await AmbulanceServices();
      const allSchedules = [];
      const dataSchedules = [];

      for (let index = 0; index < result.length; index++) {
        const hasil = await GetScheduleByTypeId(result[index].id);

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
    } catch (error) {
      console.error('Failed to fetch data from API: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    for (let index = 0; index < dataSchedules.length; index++) {
      console.log('hasil simpan data: ', dataSchedules[index]);

    }
  }, [dataSchedules]);


  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const rowsPerPage = 10

  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  

  const handleDeleteSuccess = () => {
    onSuccessDelete()
    fetchDatas()
    fetchData()
  }



  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev)
  }

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault()

    setDeletedItems(buildingId)

    setOpen(true)
  }

  return {
    page,
    isCollapsed,
    open,
    setOpen,
    datas,
    deletedItems,
    navigate,
    handleChangePage,
    rowsPerPage,
    displayedData,
    handleDeleteSuccess,
    toggleCollapse,
    confirmationDelete,

  }


}
