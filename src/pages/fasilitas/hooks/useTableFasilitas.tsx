/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { FacilityServices, FacilityDataItem } from "../../../services/ManageFacility/FacilityServices";
import { Schedule } from "@mui/icons-material";
import { GetScheduleByTypeId } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";
import { GetBuildingById } from "../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices";

export default function useTableFasilitas(fetchDatas: () => void, onSuccessDelete: () => void) {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const [dataFacility, setDataFacility] = useState<FacilityDataItem[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const [dataIdBuilding, setDataIdBuilding] = useState<string[]>([]);
  const [buildings, setBuildings] = useState<string[]>([]);
  const [dataSchedules, setDataSchedules] = useState<any[]>([])
  const [sort, setSort] = useState('');
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(100);

  useEffect(() => {
    if (sort == "Nama fasilitas A-Z") {
      setOrderBy('name=asc');
    } else if (sort == "Nama fasilitas Z-A") {
      setOrderBy('name=desc');
    } else if (sort == "Biaya penanganan terendah") {
      setOrderBy('cost=asc');
    } else if (sort == "Biaya penanganan tertinggi") {
      setOrderBy('cost=desc');
    }
  }, [sort])

  useEffect(() => {
    fetchDataFacility();
  }, [pageNumber, pageSize, orderBy]);

  const fetchDataFacility = async () => {
    try {
      const result = await FacilityServices(pageNumber, pageSize, orderBy);

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

      console.log('Formatted Schedules:', dataSchedules);
      setDataFacility(result);
      setDataSchedules(dataSchedules);

      const buildingIds = result.map((data) => data.masterBuildingId);
      setDataIdBuilding(buildingIds);
    } catch (error) {
      console.error("Failed to fetch data from API: ", error);
    }
  };


  useEffect(() => {
    fetchDataFacility();
  }, []);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const responses = await Promise.all(
          dataIdBuilding.map((id) =>
            GetBuildingById(id)
          )
        );

        const facilitiesData = responses.map((response) => {
          const buildingName = response.name;
          return buildingName || "Data Gedung Tidak Tercatat";
        });

        setBuildings(facilitiesData);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    if (dataIdBuilding.length > 0) {
      fetchBuildings();
    }
  }, [dataIdBuilding]);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;
  const displayedData = dataFacility.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
    fetchDataFacility();
    fetchDatas();
  };

  return {
    page,
    isCollapsed,
    open,
    dataFacility,
    deletedItems,
    dataIdBuilding,
    buildings,
    toggleCollapse,
    handleChangePage,
    rowsPerPage,
    displayedData,
    urutkan,
    confirmationDelete,
    handleDeleteSuccess,
    setOpen,
    Schedule,
    dataSchedules,
    setPageSize,
    setPageNumber,
    setSort
  };
}
