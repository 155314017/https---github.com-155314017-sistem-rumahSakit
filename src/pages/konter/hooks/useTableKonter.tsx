/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { CounterDataItem, CounterServices } from "../../../services/Admin Tenant/ManageCounter/CounterServices";
import { useNavigate } from "react-router-dom";
import { GetScheduleByTypeId } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";

export default function useTableKonter(fetchDatas: () => void, onSuccessDelete: () => void) {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [dataCounter, setDataCounter] = useState<CounterDataItem[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const navigate = useNavigate();
  const [dataSchedules, setDataSchedules] = useState<any[]>([])
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [sort, setSort] = useState('');
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize, orderBy]);

  useEffect(() => {
    if (sort == "Nama Konter A-Z") {
      setOrderBy('name=asc');
    } else if (sort == "Nama Konter Z-A") {
      setOrderBy('name=desc');
    } else if (sort == "Nomor Konter 1-9") {
      setOrderBy('createdDateTime=asc');
    } else if (sort == "Nomor Konter 9-1") {
      setOrderBy('createdDateTime=desc');
    }
  }, [sort])

  const urutkan = [
    { value: 1, label: "Nama Konter A-Z" },
    { value: 2, label: "Nama Konter Z-A" },
    { value: 3, label: "Nomor Konter 1-9" },
    { value: 4, label: "Nomor Konter 9-1" },
  ];
  const fetchData = async () => {
    try {
      const result = await CounterServices(pageNumber, pageSize, orderBy);
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
      setDataCounter(result);
      setDataSchedules(dataSchedules);
    } catch (error) {
      console.error('Failed to fetch data from API: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;

  const displayedData = dataCounter.slice((page - 1) * rowsPerPage, page * rowsPerPage);



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
    fetchDatas();
    fetchData();
  };
  return {
    page,
    isCollapsed,
    open,
    setOpen,
    dataCounter,
    deletedItems,
    navigate,
    handleChangePage,
    rowsPerPage,
    displayedData,
    urutkan,
    toggleCollapse,
    confirmationDelete,
    setSort,
    handleDeleteSuccess,
    dataSchedules,
    setPageNumber,
    setPageSize
  }
}
