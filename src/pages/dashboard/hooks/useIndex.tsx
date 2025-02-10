// table
import { useEffect, useState } from 'react'
import { Clinic, ClinicDataItem } from '../../../services/Admin Tenant/ManageClinic/Clinic'
import { RoomDataItem, RoomServices } from '../../../services/Admin Tenant/ManageRoom/RoomServices'
import { FacilityDataItem, FacilityServices } from '../../../services/ManageFacility/FacilityServices'
import {
  DoctorServices,
  DoctorDataItem
} from '../../../services/Admin Tenant/ManageDoctor/DoctorServices'
import { useLocation, useNavigate } from 'react-router-dom'

export default function useIndex() {
    const [dataClinic, setDataClinic] = useState<ClinicDataItem[]>([])
    const [dataRoom, setDataRoom] = useState<RoomDataItem[]>([])
    const [dataFacility, setDataFacility] = useState<FacilityDataItem[]>([])
    const [dataDoctor, setDataDoctor] = useState<DoctorDataItem[]>([])
    const [successLogin, setSuccessLogin] = useState(false)
    const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false)
    const [successDeleteRoom, setSuccessDeleteRoom] = useState(false)
    const [successDeleteFacility, setSuccessDeleteFacility] = useState(false)
    const [successDeleteAmbulance, setSuccessDeleteAmbulance] = useState(false)
    const [successDeleteClinic, setSuccessDeleteClinic] = useState(false)
    const [successDeleteCounter, setSuccessDeleteCounter] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
  
    const fetchData = async () => {
      setIsLoading(true)
      
      try {
        const resultClinic = await Clinic()
        const resultRoom = await RoomServices()
        const resultFacility = await FacilityServices()
        const resultDoctor = await DoctorServices()
  
        setDataRoom(resultRoom)
        setDataClinic(resultClinic)
        setDataFacility(resultFacility)
        setDataDoctor(resultDoctor)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch data from API' + error)
      }
    }
  
    useEffect(() => {
      fetchData()
    }, [])
  
  
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
    dataClinic,
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
    showTemporarySuccessDeleteCounter
  }
}
