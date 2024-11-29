import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
// import App from './App';
import LoginPasien from './pages/login/loginPasien/LoginPasien';
import Home from './pages';
import Gedung from '../src/pages/gedung/index';
import Ambulance from './pages/ambulance';
import DetailAmbulance from './pages/ambulance/DetailAmbulance';
import TambahAmbulance from './pages/ambulance/TambahAmbulance';
import DetailGedung from './pages/gedung/DetailGedung';
import TambahGedung from './pages/gedung/TambahGedung';
import Klinik from './pages/klinik';
import DetailKlinik from './pages/klinik/DetailKlinik';
import TambahKlinik from './pages/klinik/TambahKlinik';
import Konter from './pages/konter';
import DetailKonter from './pages/konter/DetailKonter';
import TambahKonter from './pages/konter/TambahKonter';
import Ruangan from './pages/ruangan';
import DetailRuangan from './pages/ruangan/detailRuangan';
import Fasilitas from './pages/fasilitas';
import TambahFasilitas from './pages/fasilitas/TambahFasilitas';
import TambahRuangan from './pages/ruangan/TambahRuangan';
import BioPjBaru from './pages/login/loginPasien/BioPjBaru';
import Pegawai from './pages/pegawai';
import DetailPegawai from './pages/pegawai/DetailPegawai';
import TambahPegawai from './pages/pegawai/TambahPegawai';
import Dokter from './pages/dokter';
import Pasien from './pages/pasien';
import RegisterPasienBaru from './pages/login/loginPasien/RegisterPasienBaru';
import KategoriPasien from './pages/login/loginPasien/KategoriPasien';
import RawatJalanBPJS from './pages/login/loginPasien/RawatJalanBPJS';
import RawatJalanUmum from './pages/login/loginPasien/RawatJalanUmum';
import TambahPasienBPJS from './pages/pasien/TambahPasienBPJS';
import TambahPasienUmum from './pages/pasien/TambahPasienUmum';
import EditPasienBPJS from './pages/pasien/EditPasienBPJS';
import EditPasienUmum from './pages/pasien/EditPasienUmum';
import LoginPegawai from './pages/login/loginPegawai/LoginPegawai';
import AturUlangKataSandiPegawai from './pages/login/loginPegawai/AturUlangKataSandiPegawai';
import TambahSubFasilitas from './pages/fasilitas/TambahSubFasilitas';
import EditRuangan from './pages/ruangan/EditRuangan';
import EditGedung from './pages/gedung/EditGedung';
import EditAmbulance from './pages/ambulance/EditAmbulance';
import EditFasilitas from './pages/fasilitas/EditFasilitas';
import EditSUbFasilitas from './pages/fasilitas/EditSubFasilitas';
import EditKlinik from './pages/klinik/EditKlinik';
import EditKonter from './pages/konter/EditKonter';
import RegisterPJ from './pages/login/penanggungJawab/RegisterPJ';
import PrivateRoute from './services/Admin Tenant/Auth/PrivateRoute';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<PrivateRoute />} >
          {/* Gedung */}
          <Route path="/gedung" element={<Gedung />} />
          <Route path="/detailGedung/:id" element={<DetailGedung />} />
          <Route path="/tambahGedung" element={<TambahGedung />} />
          <Route path="/editGedung/:id" element={<EditGedung />} />

          {/* Ambulance */}
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/detailAmbulance" element={<DetailAmbulance />} />
          <Route path="/tambahAmbulance" element={<TambahAmbulance />} />
          <Route path="/editAmbulance/:id" element={<EditAmbulance />} />

          {/* Dashboard  */}
          <Route path="/dashboard" element={<Home />} />

          {/* Page Klinik */}
          <Route path="/klinik" element={<Klinik />} />
          <Route path="/detailKlinik" element={<DetailKlinik />} />
          <Route path="/tambahKlinik" element={<TambahKlinik />} />
          <Route path="/editKlinik/:id" element={<EditKlinik />} />

          {/* Page Konter */}
          <Route path="/konter" element={<Konter />} />
          <Route path="/detailKonter" element={<DetailKonter />} />
          <Route path="/tambahKonter" element={<TambahKonter />} />
          <Route path="/editKonter/:id" element={<EditKonter />} />

          {/* Page Ruangan */}
          <Route path="/ruangan" element={<Ruangan />} />
          <Route path="/detailRuangan/:id" element={<DetailRuangan />} />
          <Route path="/tambahRuangan" element={<TambahRuangan />} />
          <Route path="/editRuangan/:id" element={<EditRuangan />} />

          {/* Page Fasilitas */}
          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/detailFasilitas" element={<DetailRuangan />} />
          <Route path="/tambahFasilitas" element={<TambahFasilitas />} />
          <Route path="/tambahSubFasilitas" element={<TambahSubFasilitas />} />
          <Route path="/editSubFasilitas/:id" element={<EditSUbFasilitas />} />
          <Route path="/editFasilitas/:id" element={<EditFasilitas />} />

          {/* Page Pegawai  */}
          <Route path="/pegawai" element={<Pegawai />} />
          <Route path="/detailPegawai" element={<DetailPegawai />} />
          <Route path="/tambahPegawai" element={<TambahPegawai />} />

          {/* Page Dokter  */}
          <Route path="/dokter" element={<Dokter />} />

          {/* Page Pasien  */}
          <Route path="/pasien" element={<Pasien />} />
          <Route path="/tambahPasien/BPJS" element={<TambahPasienBPJS />} />
          <Route path="/tambahPasien/Umum" element={<TambahPasienUmum />} />
          <Route path="/editPasien/BPJS" element={<EditPasienBPJS />} />
          <Route path="/editPasien/Umum" element={<EditPasienUmum />} />

          {/* <Route path="/about" element={<About />} /> */}

        </Route>


        {/* no need auth */}

        {/* register pasien */}
        <Route path="/register/pasien" element={<LoginPasien />} /> {/*1*/}
        <Route path="/register/pasien/baru" element={<RegisterPasienBaru />} /> {/*2*/}
        <Route path="/register/pj" element={<RegisterPJ />} /> {/*3*/}
        <Route path="/register/penanggungJawab" element={<BioPjBaru />} /> {/*4*/}
        <Route path="/kategori/pasien" element={<KategoriPasien />} /> {/*5*/}
        <Route path="/rawatjalan/bpjs" element={<RawatJalanBPJS />} /> {/*Selected BPJS*/}
        <Route path="/rawatjalan/umum" element={<RawatJalanUmum />} /> {/*Selected Umum*/}
        {/* login pegawai */}
        <Route path="/" element={<LoginPegawai />} />
        <Route path="/login/pegawai" element={<LoginPegawai />} />
        <Route path="/reset/password/pegawai" element={<AturUlangKataSandiPegawai />} />

        {/* end no need auth */}

      </Routes>
    </Router>
  </StrictMode>
)
