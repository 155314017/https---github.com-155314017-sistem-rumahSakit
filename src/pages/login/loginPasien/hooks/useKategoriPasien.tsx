import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Datapasien {
  idPatient: string,
  needAdmin: boolean,
}

export default function useKategoriPasien() {
  const [pasienBaru, setPasienBaru] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [patient, setPatient] = useState<Datapasien>();

  // get data passed from page before and do some conditional to check if they're new patient or not 
  useEffect(() => {
    if (location.state && location.state.categoryPatient) {
      setPatient(location.state.dataPatient)

      // if they're new patient 
    } else if (location.state && location.state.newPatient) {
      setPatient(location.state.dataPatient)
    }
  }, [location.state]);

  return {
    pasienBaru,
    setPasienBaru,
    navigate,
    patient
  }
}
