// import regisImg from "../../../img/registerPasienImage.png";
// import logo from "../../../img/St.carolus.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function useKategoriPasien() {
  const [pasienBaru, setPasienBaru] = useState(true);
  const [patientId, setPatientId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.succesSendData) {
      setPatientId(location.state.data)
    }
  }, [location.state, navigate]);

  useEffect(() => {
    console.log("pasien id di kategori: ", patientId);
  }, [patientId]);


  return {
    pasienBaru,
    setPasienBaru,
    navigate,
    patientId,
  }
}
