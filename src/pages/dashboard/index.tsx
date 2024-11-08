import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MediumCard from "../../components/medium/MediumCard";

// icon
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import BedIcon from "@mui/icons-material/Bed";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CardAdd from "../../components/medium/CardAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

// table
import TableRuangan from "../ruangan/TableRuangan";
import TablePegawai from "../pegawai/TablePegawai";
import TableGedung from "../gedung/TableGedung";
import TableFasilitas from "../fasilitas/TableFasilitas";
import TableDokter from "../dokter/TableDokter";
import TableAmbulance from "../ambulance/TableAmbulance";
import TableKlinik from "../klinik/TableKlinik";
import TableKonter from "../konter/TableKonter";
import TablePasien from "../pasien/TablePasien";
import { useEffect, useState } from "react";
import { Clinic, ClinicDataItem } from "../../services/Admin Tenant/ManageClinic/Clinic";
import { RoomDataItem, RoomServices } from "../../services/Admin Tenant/ManageRoom/RoomServices";
import { FacilityDataItem, FacilityServices } from "../../services/ManageFacility/FacilityServices";
import { DoctorServices, DoctorDataItem } from "../../services/Admin Tenant/ManageDoctor/DoctorServices";
import { Building, BuildingDataItem } from "../../services/Admin Tenant/ManageBuilding/Building";

export default function Dashboard() {
  const [dataClinic, setDataClinic] = useState<ClinicDataItem[]>([]);
  const [dataRoom, setDataRoom] = useState<RoomDataItem[]>([]);
  const [dataFacility, setDataFacility] = useState<FacilityDataItem[]>([]);
  const [dataDoctor, setDataDoctor] = useState<DoctorDataItem[]>([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [dataBuilding, setDataBuilding] = useState<BuildingDataItem[]>([]);
  const [dataRooms, setDataRooms] = useState<RoomDataItem[]>([]);

  const fetchDataRoom = async () => {
    console.log('fetching data . . . ')
    try {
      const result = await RoomServices();
      console.log('result : ' + result)
      setDataRooms(result);
      console.log(dataRooms);
    } catch (error) {
      console.log('Failed to fetch data from API' + error);
    }
  };
  useEffect(() => {
    fetchDataRoom();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching data . . . ')
      try {
        const resultClinic = await Clinic();
        const resultRoom = await RoomServices();
        const resultFacility = await FacilityServices();
        const resultDoctor = await DoctorServices();

        // console.log('result : ' + resultClinic)
        setDataRoom(resultRoom);
        setDataClinic(resultClinic);
        setDataFacility(resultFacility);
        setDataDoctor(resultDoctor);
        console.log(successAlert);
      } catch (error) {
        console.log('Failed to fetch data from API' + error);
      }
    };

    fetchData();
  }, []);


  const fetchDataBuilding = async () => {
    console.log('Fetching data...');
    try {
      const result = await Building();
      console.log('Result:', result);
      setDataBuilding(result);
      console.log(dataBuilding);
    } catch (error) {
      console.log('Failed to fetch data from API', error);
    }
  };

  useEffect(() => {
    fetchDataBuilding();
  }, []);

  const showTemporaryAlertSuccess = async () => {
    console.log("DELETEEEDDD")
    setSuccessAlert(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessAlert(false);
  };


  return (
    <Box>
      <Box sx={{ py: 5 }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "700" }}>
          Dashboard
        </Typography>
      </Box>
      <Grid container spacing={3} flex={1} justifyContent={"space-between"}>
        <MediumCard
          icon={MeetingRoomIcon}
          title="Total Ruangan"
          subtitle={dataRoom.length.toString()}
        />
        <MediumCard icon={BedIcon} title={"Ruangan tersedia"} subtitle={dataRoom.length.toString()} />
        <MediumCard icon={PeopleIcon} title={"Total pegawai"} subtitle={"10"} />
        <MediumCard
          icon={LocalHospitalIcon}
          title="Total poliklinik"
          subtitle={dataClinic.length.toString()}
        />
        <MediumCard
          icon={MedicalServicesIcon}
          title="Total dokter"
          subtitle={dataDoctor.length.toString()}
        />
        <MediumCard
          icon={MonitorHeartIcon}
          title="Total fasilitas"
          subtitle={dataFacility.length.toString()}
        />
        <CardAdd
          icon={RoomPreferencesIcon}
          title="Tambah ruangan"
          link="/tambahRuangan"
        />
        <CardAdd
          icon={PersonAddIcon}
          title="Tambah pegawai"
          link="/tambahPegawai"
        />
      </Grid>

      <Stack mt={3} spacing={3}>
        <TableGedung fetchDatas={fetchDataBuilding} sukses={showTemporaryAlertSuccess} />
        <TableRuangan fetchDatas={fetchDataRoom} />
        <TablePegawai />
        <TableFasilitas />
        <TableDokter />
        <TableAmbulance />
        <TableKlinik />
        <TableKonter />
        <TablePasien />
      </Stack>
    </Box>
  );
}
