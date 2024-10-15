import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
// import App from './App';
import LoginPasien from './pages/login/loginPasien/LoginPasien';
import Login from './pages/login/loginPegawai/LoginPages';
import RegisterPasien from './pages/login/loginPasien/RegisterPasien';
import PasienLamaRawatJalanBPJS from './pages/rawatJalan/pasienLama/PasienLamaRawatJalanBPJS';
import PasienLamaRawatJalanUmum from './pages/rawatJalan/pasienLama/PasienLamaRawatJalanUmum';
import Home from './pages';
import PasienBaruRawatJalanUmum from './pages/rawatJalan/pasienBaru/PasienBaruRawatJalanUmum';
import PasienBaruRawatJalanBPJS from './pages/rawatJalan/pasienBaru/PasienBaruRawatJalanBPJS';
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Gedung */}
        <Route path="/gedung" element={<Gedung />} />
        <Route path="/detailGedung" element={<DetailGedung />} />
        <Route path="/tambahGedung" element={<TambahGedung />} />

        {/* Ambulance */}
        <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/detailAmbulance" element={<DetailAmbulance />} />
        <Route path="/tambahAmbulance" element={<TambahAmbulance />} />

        {/* Form Login */}
        <Route path="/" element={<LoginPasien />} />
        <Route path="/login/pegawai" element={<Login />} />
        <Route path="/login/pasien" element={<LoginPasien />} />

        {/* Form Register */}
        <Route path="/register/pasien" element={<RegisterPasien />} />
        <Route path="/register/penanggungJawab" element={<BioPjBaru/>} />


        {/* Dashboard  */}
        <Route path="/dashboard" element={<Home />} />

        {/* Page Rawat Jalan  */}
        <Route path="/rawatjalan/lama/bpjs" element={<PasienLamaRawatJalanBPJS />} />
        <Route path="/rawatjalan/lama/umum" element={<PasienLamaRawatJalanUmum />} />
        <Route path="/rawatjalan/baru/bpjs" element={<PasienBaruRawatJalanBPJS />} />
        <Route path="/rawatjalan/baru/umum" element={<PasienBaruRawatJalanUmum />} />

        {/* Page Klinik */}
        <Route path="/klinik" element={<Klinik />} />
        <Route path="/detailKlinik" element={<DetailKlinik />} />
        <Route path="/tambahKlinik" element={<TambahKlinik />} />

        {/* Page Konter */}
        <Route path="/konter" element={<Konter />} />
        <Route path="/detailKonter" element={<DetailKonter />} />
        <Route path="/tambahKonter" element={<TambahKonter />} />

        {/* Page Ruangan */}
        <Route path="/ruangan" element={<Ruangan/>} />
        <Route path="/detailRuangan" element={<DetailRuangan/>} />
        <Route path="/tambahRuangan" element={<TambahRuangan/>} />

        {/* Page Fasilitas */}
        <Route path="/fasilitas" element={<Fasilitas/>} />
        <Route path="/detailFasilitas" element={<DetailRuangan />} />
        <Route path="/tambahFasilitas" element={<TambahFasilitas/>} />

        {/* Page Pegawai  */}
        <Route path="/pegawai" element={<Pegawai/>} />
        <Route path="/detailPegawai" element={<DetailPegawai/>} />
        <Route path="/tambahPegawai" element={<TambahPegawai/>} />

        {/* Page Dokter  */}
        <Route path="/dokter" element={<Dokter/>} />



        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  </StrictMode>,
);
