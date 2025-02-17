// hooks/useIndex.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAGE_SIZE } from '../../gedung/hooks/useIndex';
import { RoomServices } from '../../../services/Admin Tenant/ManageRoom/RoomServices';
import { FacilityDataItem, FacilityServices } from '../../../services/Admin Tenant/ManageFacility/FacilityServices';
import { DoctorDataItem, DoctorServices } from '../../../services/Admin Tenant/ManageDoctor/DoctorServices';
import { Building } from '../../../services/Admin Tenant/ManageBuilding/Building';
import { AmbulanceServices } from '../../../services/Admin Tenant/ManageAmbulance/AmbulanceServices';
import { Clinic } from '../../../services/Admin Tenant/ManageClinic/Clinic';
import { CounterServices } from '../../../services/Admin Tenant/ManageCounter/CounterServices';
import { PatientServices } from '../../../services/ManagePatient/PatientServices';
import { useFetchData } from '../../../hooks/useFetchData';
import {
  RoomDataItem
} from '../../../types/room.types';
import { BuildingDataItem } from '../../../types/building.types';
import { AmbulanceDataItem } from '../../../types/ambulance.types';
import { ClinicDataItem } from '../../../types/clinic.types';
import { CounterDataItem } from '../../../types/counter.types';
import { PatientDataItem } from '../../../types/patient.types';

export default function useIndex() {
  const [pageNumber, setPageNumber] = useState(0);
  const [orderByRoom, setOrderByRoom] = useState("createdDateTime=asc");
  const [orderByFacility, setOrderByFacility] = useState("createdDateTime=asc");
  const [orderByBuilding, setOrderByBuilding] = useState("createdDateTime=asc");
  const [orderAmbulance, setOrderAmbulance] = useState("createdDateTime=asc");
  const [orderClinic, setOrderClinic] = useState("createdDateTime=asc");
  const [orderCounter, setOrderCounter] = useState("createdDateTime=asc");
  const [orderPatient, setOrderPatient] = useState("createdDateTime=asc");
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: dataRoom,
    totalElements: totalElementsRoom,
    loading: loadingRoom,
    refetch: refetchRooms
  } = useFetchData<RoomDataItem[]>(RoomServices, [pageNumber, PAGE_SIZE, orderByRoom]);

  const {
    data: dataFacility,
    totalElements: totalElementsFacility,
    loading: loadingFacility,
    refetch: refetchFacilities
  } = useFetchData<FacilityDataItem[]>(FacilityServices, [pageNumber, PAGE_SIZE, orderByFacility]);

  const {
    data: dataDoctor,
    loading: loadingDoctor,
    refetch: refetchDoctors
  } = useFetchData<DoctorDataItem[]>(DoctorServices);

  const {
    data: dataBuilding,
    totalElements: totalElementsBuilding,
    loading: loadingBuilding,
    refetch: refetchBuildings
  } = useFetchData<BuildingDataItem[]>(Building, [pageNumber, PAGE_SIZE, orderByBuilding]);

  const {
    data: dataAmbulance,
    totalElements: totalElementsAmbulance,
    loading: loadingAmbulance,
    refetch: refetchAmbulance
  } = useFetchData<AmbulanceDataItem[]>(AmbulanceServices, [pageNumber, PAGE_SIZE, orderAmbulance]);

  const {
    data: dataClinic,
    totalElements: totalElementsClinic,
    loading: loadingClinic,
    refetch: refetchClinic
  } = useFetchData<ClinicDataItem[]>(Clinic, [pageNumber, PAGE_SIZE, orderClinic]);

  const {
    data: dataCounter,
    totalElements: totalElementsCounter,
    loading: loadingCounter,
    refetch: refetchCounter
  } = useFetchData<CounterDataItem[]>(CounterServices, [pageNumber, PAGE_SIZE, orderCounter]);

  const {
    data: dataPatient,
    totalElements: totalElementsPatient,
    loading: loadingPatient,
    refetch: refetchPatient
  } = useFetchData<PatientDataItem[]>(PatientServices, [pageNumber, PAGE_SIZE, orderPatient]);

  const dataIdBuilding = dataRoom.map((room) => room.masterBuildingId);


  const isLoading =
    loadingRoom ||
    loadingFacility ||
    loadingDoctor ||
    loadingBuilding ||
    loadingAmbulance ||
    loadingClinic ||
    loadingCounter ||
    loadingPatient;

  const [successLogin, setSuccessLogin] = useState(false);
  const [successDeleteRoom, setSuccessDeleteRoom] = useState(false);
  const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
  const [successDeleteFacility, setSuccessDeleteFacility] = useState(false);
  const [successDeleteAmbulance, setSuccessDeleteAmbulance] = useState(false);
  const [successDeleteClinic, setSuccessDeleteClinic] = useState(false);
  const [successDeleteCounter, setSuccessDeleteCounter] = useState(false);

  const showTemporarySuccess = async (setSuccess: React.Dispatch<React.SetStateAction<boolean>>) => {
    setSuccess(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setSuccess(false);
  };

  useEffect(() => {
    if (location.state && location.state.statusLogin) {
      (async () => {
        await showTemporarySuccess(setSuccessLogin);
        navigate(location.pathname, { replace: true, state: undefined });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const refetchAll = useCallback(() => {
    refetchRooms();
    refetchFacilities();
    refetchDoctors();
    refetchBuildings();
    refetchAmbulance();
    refetchClinic();
    refetchCounter();
    refetchPatient();
  }, []);

  useEffect(() => {
    console.log('masokkkk')
    refetchBuildings();
  }, [orderByBuilding]);

  const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      refetchAll();
      hasFetched.current = true;
    }
  }, [refetchAll]);

  return {
    dataRoom,
    dataFacility,
    dataDoctor,
    dataBuilding,
    dataAmbulance,
    dataClinic,
    dataCounter,
    dataPatient,
    dataIdBuilding,
    totalElementsRoom,
    totalElementsFacility,
    totalElementsBuilding,
    totalElementsAmbulance,
    totalElementsClinic,
    totalElementsCounter,
    totalElementsPatient,
    isLoading,
    successLogin,
    successDeleteRoom,
    successDeleteBuilding,
    successDeleteFacility,
    successDeleteAmbulance,
    successDeleteClinic,
    successDeleteCounter,
    setPageNumber,
    setOrderByRoom,
    setOrderByFacility,
    setOrderByBuilding,
    setOrderAmbulance,
    setOrderClinic,
    setOrderCounter,
    setOrderPatient,
    refetchAll,
    showTemporarySuccessDeleteRoom: () => showTemporarySuccess(setSuccessDeleteRoom),
    showTemporarySuccessDeleteBuilding: () => showTemporarySuccess(setSuccessDeleteBuilding),
    showTemporarySuccessDeleteFacility: () => showTemporarySuccess(setSuccessDeleteFacility),
    showTemporarySuccessDeleteAmbulance: () => showTemporarySuccess(setSuccessDeleteAmbulance),
    showTemporarySuccessDeleteClinic: () => showTemporarySuccess(setSuccessDeleteClinic),
    showTemporarySuccessDeleteCounter: () => showTemporarySuccess(setSuccessDeleteCounter)
  };
}
