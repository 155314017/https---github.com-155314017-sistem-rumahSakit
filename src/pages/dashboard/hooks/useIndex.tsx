// table
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Building } from '../../../services/Admin Tenant/ManageBuilding/Building'
import { Clinic} from '../../../services/Admin Tenant/ManageClinic/Clinic'
import {
  DoctorDataItem,
  DoctorServices
} from '../../../services/Admin Tenant/ManageDoctor/DoctorServices'
import { FacilityDataItem, FacilityServices } from '../../../services/Admin Tenant/ManageFacility/FacilityServices'
import { RoomServices } from '../../../services/Admin Tenant/ManageRoom/RoomServices'
import { BuildingDataItem } from '../../../types/building.types'
import { RoomDataItem } from '../../../types/room.types'
import { PAGE_SIZE } from '../../gedung/hooks/useIndex'
import { AmbulanceServices } from '../../../services/Admin Tenant/ManageAmbulance/AmbulanceServices'
import { AmbulanceDataItem } from '../../../types/ambulance.types'
import { ClinicDataItem } from '../../../types/clinic.types'
import { CounterDataItem } from '../../../types/counter.types'
import { PatientDataItem } from '../../../types/patient.types'
import { CounterServices } from '../../../services/Admin Tenant/ManageCounter/CounterServices'
import { PatientServices } from '../../../services/ManagePatient/PatientServices'


export default function useIndex() {
  const [dataRoom, setDataRoom] = useState<RoomDataItem[]>([])
  const [dataFacility, setDataFacility] = useState<FacilityDataItem[]>([])
  const [dataDoctor, setDataDoctor] = useState<DoctorDataItem[]>([])
  const [dataBuilding, setDataBuilding] = useState<BuildingDataItem[]>([])
  const [dataAmbulance, setDataAmbulance] = useState<AmbulanceDataItem[]>([])
  const [dataClinic, setDataClinic] = useState<ClinicDataItem[]>([])
  const [dataCounter, setDataCounter] = useState<CounterDataItem[]>([])
  const [dataPatient, setDataPatient] = useState<PatientDataItem[]>([])
  const [successLogin, setSuccessLogin] = useState(false)
  const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false)
  const [successDeleteRoom, setSuccessDeleteRoom] = useState(false)
  const [successDeleteFacility, setSuccessDeleteFacility] = useState(false)
  const [successDeleteAmbulance, setSuccessDeleteAmbulance] = useState(false)
  const [successDeleteClinic, setSuccessDeleteClinic] = useState(false)
  const [successDeleteCounter, setSuccessDeleteCounter] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0);
  const [totalElementsBuilding, setTotalElementsBuilding] = useState(0);
  const [totalElementsRoom, setTotalElementsRoom] = useState(0);
  const [totalElementsFacility, setTotalElementsFacility] = useState(0);
  const [totalElementsAmbulance, setTotalElementsAmbulance] = useState(0);
  const [totalElementsClinic, setTotalElementsClinic] = useState(0);
  const [totalElementsCounter, setTotalElementsCounter] = useState(0);
  const [totalElementsPatient, setTotalElementsPatient] = useState(0);
  const [orderByBuilding, setOrderByBuilding] = useState("createdDateTime=asc");
  const [orderByRoom, setOrderByRoom] = useState("createdDateTime=asc");
  const [orderByFacility, setOrderByFacility] = useState("createdDateTime=asc");
  const [orderAmbulance, setOrderAmbulance] = useState("createdDateTime=asc");
  const [orderClinic, setOrderClinic] = useState("createdDateTime=asc");
  const [orderCounter, setOrderCounter] = useState("createdDateTime=asc");
  const [orderPatient, setOrderPatient] = useState("createdDateTime=asc");
  const [dataIdBuilding, setDataIdBuilding] = useState<string[]>([]);
  const location = useLocation()
  const navigate = useNavigate()

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const resultRoom = await RoomServices(pageNumber, PAGE_SIZE, orderByRoom)
      const resultFacility = await FacilityServices(pageNumber, PAGE_SIZE, orderByFacility)
      const resultDoctor = await DoctorServices()
      const resultBuilding = await Building(pageNumber, PAGE_SIZE, orderByBuilding);
      const resultAmbulance = await AmbulanceServices(pageNumber, PAGE_SIZE, orderAmbulance )
      const resultClinic = await Clinic(pageNumber, PAGE_SIZE, orderClinic);
      const resultCounter = await CounterServices(pageNumber, PAGE_SIZE, orderCounter );
      const resultPatient = await PatientServices(pageNumber, PAGE_SIZE, orderPatient )
      setTotalElementsBuilding(resultBuilding.data.totalElements);
      setDataRoom(resultRoom.data.content)
      setTotalElementsRoom(resultRoom.data.totalElements);
      setTotalElementsAmbulance(resultAmbulance.data.totalElements)
      setTotalElementsClinic(resultClinic.data.totalElements)
      setTotalElementsCounter(resultCounter.data.totalElements)
      setTotalElementsPatient(resultPatient.data.totalElements)
      const buildingIds = resultRoom.data.content.map((data: { masterBuildingId: string; }) => data.masterBuildingId);
      setDataIdBuilding(buildingIds);
      setDataClinic(resultClinic.data.content)
      setDataAmbulance(resultAmbulance.data.content)
      setDataCounter(resultCounter.data.content)
      setDataPatient(resultPatient.data.content)
      setDataFacility(resultFacility.data.content)
      setTotalElementsFacility(resultFacility.data.totalElements);
      setDataDoctor(resultDoctor)
      setDataBuilding(resultBuilding.data.content)
      setIsLoading(false)

    } catch (error) {
      console.error('Failed to fetch data from API' + error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [orderByBuilding, orderByRoom, orderByFacility])


  const showTemporarySuccessDeleteRoom = async () => {

    setSuccessDeleteRoom(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessDeleteRoom(false)
  }

  const showTemporarySuccessDeleteBuilding = async () => {

    setSuccessDeleteBuilding(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessDeleteBuilding(false)
  }

  const showTemporarySuccessDeleteFacility = async () => {

    setSuccessDeleteFacility(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessDeleteFacility(false)
  }

  const showTemporarySuccessDeleteAmbulance = async () => {

    setSuccessDeleteAmbulance(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessDeleteAmbulance(false)
  }

  const showTemporarySuccessDeleteClinic = async () => {

    setSuccessDeleteClinic(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessDeleteClinic(false)
  }

  const showTemporarySuccessDeleteCounter = async () => {

    setSuccessDeleteCounter(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessDeleteCounter(false)
  }

  const showTemporarySuccessDeletePatient = async () => {

    setSuccessDeleteCounter(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessDeleteCounter(false)
  }

  useEffect(() => {
    if (location.state && location.state.statusLogin) {
      showTemporarySuccessLogin()
      navigate(location.pathname, { replace: true, state: undefined })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, navigate])

  const showTemporarySuccessLogin = async () => {

    setSuccessLogin(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessLogin(false)
  }
  return {
    dataRoom,
    dataFacility,
    dataDoctor,
    fetchData,
    successLogin,
    successDeleteBuilding,
    successDeleteRoom,
    successDeleteFacility,
    successDeleteAmbulance,
    successDeleteClinic,
    successDeleteCounter,
    isLoading,
    showTemporarySuccessDeleteRoom,
    showTemporarySuccessDeleteBuilding,
    showTemporarySuccessDeleteFacility,
    showTemporarySuccessDeleteAmbulance,
    showTemporarySuccessDeleteClinic,
    showTemporarySuccessDeleteCounter,
    showTemporarySuccessDeletePatient,
    dataBuilding,
    setPageNumber,
    setOrderByBuilding,
    setOrderByRoom,
    setOrderByFacility,
    setOrderAmbulance,
    setOrderClinic,
    setOrderCounter,
    setOrderPatient,
    dataAmbulance,
    dataClinic,
    dataCounter,
    dataPatient,
    dataIdBuilding,
    totalElementsBuilding,
    totalElementsRoom,
    totalElementsFacility,
    totalElementsAmbulance,
    totalElementsClinic,
    totalElementsCounter,
    totalElementsPatient
  }
}
