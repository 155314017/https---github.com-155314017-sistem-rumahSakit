// import regisImg from "../../../img/registerPasienImage.png";
// import logo from "../../../img/St.carolus.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function useKategoriPasien() {
  const [pasienBaru, setPasienBaru] = useState(true);
  const navigate = useNavigate();

  return{
    pasienBaru,
    setPasienBaru,
    navigate

  }
}
