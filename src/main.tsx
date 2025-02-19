import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Gedung from '../src/pages/gedung/features/Index';
import Ambulance from './pages/ambulance/features/Index';
import DetailAmbulance from './pages/ambulance/features/DetailAmbulance';
import TambahAmbulance from './pages/ambulance/features/AddAmbulance';
import DetailGedung from './pages/gedung/features/DetailBuilding.tsx';
import TambahGedung from './pages/gedung/features/AddBuilding.tsx';
import Klinik from './pages/klinik/features/Index';
import DetailKlinik from './pages/klinik/features/DetailClinic.tsx';
import TambahKlinik from './pages/klinik/features/AddClinic.tsx';
import Konter from './pages/konter/features/Index';
import DetailKonter from './pages/konter/features/DetailCounter.tsx';
import TambahKonter from './pages/konter/features/AddCounter.tsx';
import Ruangan from './pages/ruangan/features/Index';
import DetailRuangan from './pages/ruangan/features/DetailRoom.tsx';
import Fasilitas from './pages/fasilitas/features/Index';
import TambahFasilitas from './pages/fasilitas/features/AddFacility.tsx';
import TambahRuangan from './pages/ruangan/features/AddRoom.tsx';
import Pegawai from './pages/pegawai/features/Index';
import DetailPegawai from './pages/pegawai/features/EmployeeDetail';
import TambahPegawai from './pages/pegawai/features/AddEmployee.tsx';
import Dokter from './pages/dokter/features/Index';
import Pasien from './pages/pasien/features/Index';
import TambahPasienBPJS from './pages/pasien/features/AddPatientBPJS.tsx';
import TambahPasienUmum from './pages/pasien/features/AddGeneralPatients.tsx';
import EditPasienBPJS from './pages/pasien/features/EditPatientBPJS.tsx';
import EditPasienUmum from './pages/pasien/features/EditGeneralPatients.tsx';
import LoginPegawai from './pages/login/loginPegawai/features/LoginEmployee.tsx';
import AturUlangKataSandiPegawai from './pages/login/loginPegawai/features/ResetEmployeePassword.tsx';
import TambahSubFasilitas from './pages/fasilitas/features/AddSubFacility.tsx';
import EditRuangan from './pages/ruangan/features/EditRoom.tsx';
import EditGedung from './pages/gedung/features/EditBuilding.tsx';
import EditAmbulance from './pages/ambulance/features/EditAmbulance';
import EditFasilitas from './pages/fasilitas/features/EditFacility.tsx';
import EditSUbFasilitas from './pages/fasilitas/features/EditSubFacility.tsx';
import EditKlinik from './pages/klinik/features/EditClinic.tsx';
import EditKonter from './pages/konter/features/EditCounter.tsx';
import PrivateRoute from './services/Admin Tenant/Auth/PrivateRoute';
import PilihKategoriPasien from './pages/registrationPatient/offline/features/SelectPatientCategory.tsx';
import TambahPasienUmumOffline from './pages/registrationPatient/offline/features/AddPatientsGeneralOffline.tsx';
import DetailFasilitas from './pages/fasilitas/features/DetailFacility.tsx';
import DetailDokter from './pages/dokter/features/DoctorDetail';
import RegistrationOnline from './pages/registrationPatient/online/features/RegistrationOnline';
import NotFoundPage from './pages/NotFoundPage';
import HomeAdmin from './pages/home/homeAdmin';
import HomeQueue from './pages/home/homeQueue';
import OutpatientDetails from './pages/antrian/features/OutpatientDetails';
// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>

        {/* need auth login admin  */}
        <Route element={<PrivateRoute />} >
          {/* DashboardAdmin  */}
          <Route path="/dashboard" element={<HomeAdmin />} />

          {/* User Management Section  */}

          {/* Page Pegawai  */}
          <Route path="/pegawai" element={<Pegawai />} />
          <Route path="/detailPegawai/:id" element={<DetailPegawai />} />
          <Route path="/tambahPegawai" element={<TambahPegawai />} />

          {/* Page Dokter  */}
          <Route path="/dokter" element={<Dokter />} />
          <Route path="/detailDokter/:id" element={<DetailDokter />} />


          {/* Health Manage  */}
          {/* Gedung */}
          <Route path="/gedung" element={<Gedung />} />
          <Route path="/detailGedung/:id" element={<DetailGedung />} />
          <Route path="/tambahGedung" element={<TambahGedung />} />
          <Route path="/editGedung/:id" element={<EditGedung />} />

          {/* Page Ruangan */}
          <Route path="/ruangan" element={<Ruangan />} />
          <Route path="/detailRuangan/:id" element={<DetailRuangan />} />
          <Route path="/tambahRuangan" element={<TambahRuangan />} />
          <Route path="/editRuangan/:id" element={<EditRuangan />} />

          {/* Ambulance */}
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/detailAmbulance/:id" element={<DetailAmbulance />} />
          <Route path="/tambahAmbulance" element={<TambahAmbulance />} />
          <Route path="/editAmbulance/:id" element={<EditAmbulance />} />

          {/* Page Fasilitas */}
          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/detailFasilitas/:id" element={<DetailFasilitas />} />
          <Route path="/tambahFasilitas" element={<TambahFasilitas />} />
          <Route path="/tambahSubFasilitas" element={<TambahSubFasilitas />} />
          <Route path="/editSubFasilitas/:id" element={<EditSUbFasilitas />} />
          <Route path="/editFasilitas/:id" element={<EditFasilitas />} />

          {/* Page Klinik */}
          <Route path="/klinik" element={<Klinik />} />
          <Route path="/detailKlinik/:id" element={<DetailKlinik />} />
          <Route path="/tambahKlinik" element={<TambahKlinik />} />
          <Route path="/editKlinik/:id" element={<EditKlinik />} />

          {/* Page Konter */}
          <Route path="/konter" element={<Konter />} />
          <Route path="/detailKonter/:id" element={<DetailKonter />} />
          <Route path="/tambahKonter" element={<TambahKonter />} />
          <Route path="/editKonter/:id" element={<EditKonter />} />

          {/* Page Pasien  */}
          <Route path="/pasien" element={<Pasien />} />
          <Route path="/tambahPasien/BPJS" element={<TambahPasienBPJS />} />
          <Route path="/tambahPasien/Umum" element={<TambahPasienUmum />} />
          <Route path="/editPasien/BPJS" element={<EditPasienBPJS />} />
          <Route path="/editPasien/Umum" element={<EditPasienUmum />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Route>

        {/* registrasi pasien  */}
        <Route path="/registrasi/offline" element={<PilihKategoriPasien />} />
        <Route path="/tambahPasien/umum/offline" element={<TambahPasienUmumOffline />} />

        <Route path="/registrasi/online" element={<RegistrationOnline />} />

        {/* login pegawai/admin  */}
        <Route path="/" element={<LoginPegawai />} />
        <Route path="/login/pegawai" element={<LoginPegawai />} />

        {/* reset pass admin/pegawai  */}
        <Route path="/reset/password/pegawai" element={<AturUlangKataSandiPegawai />} />


        {/* dashboard antrian  */}
        <Route path="/dashboardQueue" element={<HomeQueue />} />


        {/* not found route  */}
        <Route path="/detailRawat" element={<OutpatientDetails />} />

        {/* not found route  */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </StrictMode>
)
