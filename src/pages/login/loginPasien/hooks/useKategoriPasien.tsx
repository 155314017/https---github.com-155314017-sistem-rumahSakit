// import regisImg from "../../../img/registerPasienImage.png";
// import logo from "../../../img/St.carolus.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function useKategoriPasien() {
  const [pasienBaru, setPasienBaru] = useState(true);
  const [patientId, setPatientId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [notFound, setNotFound] = useState(false);
  const[show, setShow] = useState(true)

  useEffect(() => {
    if (location.state && location.state.succesSendData) {
      setPatientId(location.state.data)
    }
  }, [location.state, navigate]);

  useEffect(() => {
    console.log("pasien id di kategori: ", patientId);
  }, [patientId]);


  useEffect(() => {
    console.log("Id Patient: ", patientId);

    const timeoutId = setTimeout(() => {
      if (patientId === '') {
        setNotFound(true);
        setShow(false)
        
    } else {

        setNotFound(false);
        setShow(true)
        
    }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    }

    
}, [patientId]);
  return {
    pasienBaru,
    setPasienBaru,
    navigate,
    patientId,
    notFound,
    show
  }
}
