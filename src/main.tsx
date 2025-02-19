import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Building from '../src/pages/gedung/features/Index';
import Ambulance from './pages/ambulance/features/Index';
import DetailAmbulance from './pages/ambulance/features/DetailAmbulance';
import AddAmbulance from './pages/ambulance/features/AddAmbulance';
import DetailBuilding from './pages/gedung/features/DetailBuilding.tsx';
import AddBuilding from './pages/gedung/features/AddBuilding.tsx';
import Clinic from './pages/klinik/features/Index';
import DetailClinic from './pages/klinik/features/DetailClinic.tsx';
import AddClinic from './pages/klinik/features/AddClinic.tsx';
import Counter from './pages/konter/features/Index';
import DetailCounter from './pages/konter/features/DetailCounter.tsx';
import AddCounter from './pages/konter/features/AddCounter.tsx';
import Room from './pages/ruangan/features/Index';
import DetailRoom from './pages/ruangan/features/DetailRoom.tsx';
import Facility from './pages/fasilitas/features/Index';
import AddFacility from './pages/fasilitas/features/AddFacility.tsx';
import AddRoom from './pages/ruangan/features/AddRoom.tsx';
import Employee from './pages/pegawai/features/Index';
import DetailEmployee from './pages/pegawai/features/EmployeeDetail';
import AddEmployee from './pages/pegawai/features/AddEmployee.tsx';
import Dokter from './pages/dokter/features/Index';
import Pasien from './pages/pasien/features/Index';
import AddPasienBPJS from './pages/pasien/features/AddPatientBPJS.tsx';
import AddGeneralPatient from './pages/pasien/features/AddGeneralPatients.tsx';
import EditPasienBPJS from './pages/pasien/features/EditPatientBPJS.tsx';
import EditGeneralPatient from './pages/pasien/features/EditGeneralPatients.tsx';
import LoginEmployee from './pages/login/loginPegawai/features/LoginEmployee.tsx';
import ResetEmployeePassword from './pages/login/loginPegawai/features/ResetEmployeePassword.tsx';
import AddSubFacility from './pages/fasilitas/features/AddSubFacility.tsx';
import EditRoom from './pages/ruangan/features/EditRoom.tsx';
import EditBuilding from './pages/gedung/features/EditBuilding.tsx';
import EditAmbulance from './pages/ambulance/features/EditAmbulance';
import EditFacility from './pages/fasilitas/features/EditFacility.tsx';
import EditSUbFacility from './pages/fasilitas/features/EditSubFacility.tsx';
import EditClinic from './pages/klinik/features/EditClinic.tsx';
import EditCounter from './pages/konter/features/EditCounter.tsx';
import PrivateRoute from './services/Admin Tenant/Auth/PrivateRoute';
import SelectPatientCategory from './pages/registrationPatient/offline/features/SelectPatientCategory.tsx';
import AddGeneralPatientOffline from './pages/registrationPatient/offline/features/AddPatientsGeneralOffline.tsx';
import DetailFacility from './pages/fasilitas/features/DetailFacility.tsx';
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

          {/* Page Employee  */}
          <Route path="/pegawai" element={<Employee />} />
          <Route path="/detailPegawai/:id" element={<DetailEmployee />} />
          <Route path="/tambahPegawai" element={<AddEmployee />} />

          {/* Page Dokter  */}
          <Route path="/dokter" element={<Dokter />} />
          <Route path="/detailDokter/:id" element={<DetailDokter />} />


          {/* Health Manage  */}
          {/* Building */}
          <Route path="/gedung" element={<Building />} />
          <Route path="/detailBuilding/:id" element={<DetailBuilding />} />
          <Route path="/tambahBuilding" element={<AddBuilding />} />
          <Route path="/editBuilding/:id" element={<EditBuilding />} />

          {/* Page Room */}
          <Route path="/ruangan" element={<Room />} />
          <Route path="/detailRoom/:id" element={<DetailRoom />} />
          <Route path="/tambahRoom" element={<AddRoom />} />
          <Route path="/editRoom/:id" element={<EditRoom />} />

          {/* Ambulance */}
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/detailAmbulance/:id" element={<DetailAmbulance />} />
          <Route path="/tambahAmbulance" element={<AddAmbulance />} />
          <Route path="/editAmbulance/:id" element={<EditAmbulance />} />

          {/* Page Facility */}
          <Route path="/fasilitas" element={<Facility />} />
          <Route path="/detailFacility/:id" element={<DetailFacility />} />
          <Route path="/tambahFacility" element={<AddFacility />} />
          <Route path="/tambahSubFacility" element={<AddSubFacility />} />
          <Route path="/editSubFacility/:id" element={<EditSUbFacility />} />
          <Route path="/editFacility/:id" element={<EditFacility />} />

          {/* Page Clinic */}
          <Route path="/klinik" element={<Clinic />} />
          <Route path="/detailClinic/:id" element={<DetailClinic />} />
          <Route path="/tambahClinic" element={<AddClinic />} />
          <Route path="/editClinic/:id" element={<EditClinic />} />

          {/* Page Counter */}
          <Route path="/konter" element={<Counter />} />
          <Route path="/detailCounter/:id" element={<DetailCounter />} />
          <Route path="/tambahCounter" element={<AddCounter />} />
          <Route path="/editCounter/:id" element={<EditCounter />} />

          {/* Page Pasien  */}
          <Route path="/pasien" element={<Pasien />} />
          <Route path="/tambahPasien/BPJS" element={<AddPasienBPJS />} />
          <Route path="/tambahPasien/Umum" element={<AddGeneralPatient />} />
          <Route path="/editPasien/BPJS" element={<EditPasienBPJS />} />
          <Route path="/editPasien/Umum" element={<EditGeneralPatient />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Route>

        {/* registrasi pasien  */}
        <Route path="/registrasi/offline" element={<SelectPatientCategory />} />
        <Route path="/tambahPasien/umum/offline" element={<AddGeneralPatientOffline />} />

        <Route path="/registrasi/online" element={<RegistrationOnline />} />

        {/* login pegawai/admin  */}
        <Route path="/" element={<LoginEmployee />} />
        <Route path="/login/pegawai" element={<LoginEmployee />} />

        {/* reset pass admin/pegawai  */}
        <Route path="/reset/password/pegawai" element={<ResetEmployeePassword />} />


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
