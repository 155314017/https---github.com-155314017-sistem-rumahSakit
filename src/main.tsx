import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
// import App from './App';
import Gedung from '../src/pages/gedung/features/Index';
import Ambulance from './pages/ambulance/features/Index';
import DetailAmbulance from './pages/ambulance/features/DetailAmbulance';
import TambahAmbulance from './pages/ambulance/features/TambahAmbulance';
import DetailGedung from './pages/gedung/features/DetailGedung';
import TambahGedung from './pages/gedung/features/TambahGedung';
import Klinik from './pages/klinik/features/Index';
import DetailKlinik from './pages/klinik/features/DetailKlinik';
import TambahKlinik from './pages/klinik/features/TambahKlinik';
import Konter from './pages/konter/features/Index';
import DetailKonter from './pages/konter/features/DetailKonter';
import TambahKonter from './pages/konter/features/TambahKonter';
import Ruangan from './pages/ruangan/features/Index';
import DetailRuangan from './pages/ruangan/features/DetailRuangan';
import Fasilitas from './pages/fasilitas/features/Index';
import TambahFasilitas from './pages/fasilitas/features/TambahFasilitas';
import TambahRuangan from './pages/ruangan/features/TambahRuangan';
import Pegawai from './pages/pegawai/features/Index';
import DetailPegawai from './pages/pegawai/features/DetailPegawai';
import TambahPegawai from './pages/pegawai/features/TambahPegawai';
import Dokter from './pages/dokter/features/Index';
import Pasien from './pages/pasien/features/Index';
import TambahPasienBPJS from './pages/pasien/features/TambahPasienBPJS';
import TambahPasienUmum from './pages/pasien/features/TambahPasienUmum';
import EditPasienBPJS from './pages/pasien/features/EditPasienBPJS';
import EditPasienUmum from './pages/pasien/features/EditPasienUmum';
import LoginPegawai from './pages/login/loginPegawai/features/LoginPegawai';
import AturUlangKataSandiPegawai from './pages/login/loginPegawai/features/AturUlangKataSandiPegawai';
import TambahSubFasilitas from './pages/fasilitas/features/TambahSubFasilitas';
import EditRuangan from './pages/ruangan/features/EditRuangan';
import EditGedung from './pages/gedung/features/EditGedung';
import EditAmbulance from './pages/ambulance/features/EditAmbulance';
import EditFasilitas from './pages/fasilitas/features/EditFasilitas';
import EditSUbFasilitas from './pages/fasilitas/features/EditSubFasilitas';
import EditKlinik from './pages/klinik/features/EditKlinik';
import EditKonter from './pages/konter/features/EditKonter';
import PrivateRoute from './services/Admin Tenant/Auth/PrivateRoute';
import PilihKategoriPasien from './pages/pasien/pasienn/features/PilihKategoriPasien';
import TambahPasienUmumOffline from './pages/pasien/pasienn/features/TambahPasienUmumOffline';
import DetailFasilitas from './pages/fasilitas/features/DetailFasilitas';
import DetailDokter from './pages/dokter/features/DetailDokter';
import RegistrationOnline from './pages/pasien/features/RegistrationOnline';
import NotFoundPage from './pages/NotFoundPage';
import HomeAdmin from './pages/home/homeAdmin';
import HomeQueue from './pages/home/homeQueue';
// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>

        {/* need auth login admin  */}
        <Route element={<PrivateRoute />} >

          {/* Gedung */}
          <Route path="/gedung" element={<Gedung />} />
          <Route path="/detailGedung/:id" element={<DetailGedung />} />
          <Route path="/tambahGedung" element={<TambahGedung />} />
          <Route path="/editGedung/:id" element={<EditGedung />} />

          {/* Ambulance */}
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/detailAmbulance/:id" element={<DetailAmbulance />} />
          <Route path="/tambahAmbulance" element={<TambahAmbulance />} />
          <Route path="/editAmbulance/:id" element={<EditAmbulance />} />

          {/* DashboardAdmin  */}
          <Route path="/dashboard" element={<HomeAdmin />} />

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

          {/* Page Ruangan */}
          <Route path="/ruangan" element={<Ruangan />} />
          <Route path="/detailRuangan/:id" element={<DetailRuangan />} />
          <Route path="/tambahRuangan" element={<TambahRuangan />} />
          <Route path="/editRuangan/:id" element={<EditRuangan />} />

          {/* Page Fasilitas */}
          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/detailFasilitas/:id" element={<DetailFasilitas />} />
          <Route path="/tambahFasilitas" element={<TambahFasilitas />} />
          <Route path="/tambahSubFasilitas" element={<TambahSubFasilitas />} />
          <Route path="/editSubFasilitas/:id" element={<EditSUbFasilitas />} />
          <Route path="/editFasilitas/:id" element={<EditFasilitas />} />

          {/* Page Pegawai  */}
          <Route path="/pegawai" element={<Pegawai />} />
          <Route path="/detailPegawai/:id" element={<DetailPegawai />} />
          <Route path="/tambahPegawai" element={<TambahPegawai />} />

          {/* Page Dokter  */}
          <Route path="/dokter" element={<Dokter />} />
          <Route path="/detailDokter/:id" element={<DetailDokter />} />

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

        {/* not found route  */}
        <Route path="*" element={<NotFoundPage />} />

        {/* dashboard antrian  */}
        <Route path="/dashboardQueue" element={<HomeQueue />} />
      </Routes>
    </Router>
  </StrictMode>
)
