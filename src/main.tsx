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
import Gedung from '../src/pages/gedung/index';
import Ambulance from './pages/ambulance';
import DetailAmbulance from './pages/ambulance/DetailAmbulance';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/gedung" element={<Gedung />} />
        <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/detailAmbulance" element={<DetailAmbulance />} />
        <Route path="/" element={<LoginPasien/>} />
        <Route path="/login/pegawai" element={<Login />} />
        <Route path="/login/pasien" element={<LoginPasien />} />
        <Route path="/register/pasien" element={<RegisterPasien />} />
        <Route path="/rawatjalan/lama/bpjs" element={<PasienLamaRawatJalanBPJS />} />
        <Route path="/rawatjalan/lama/umum" element={<PasienLamaRawatJalanUmum />} />

        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  </StrictMode>,
);
