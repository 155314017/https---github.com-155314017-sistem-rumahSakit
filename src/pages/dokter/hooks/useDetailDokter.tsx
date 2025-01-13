import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { GetDoctorServices } from "../../../services/Admin Tenant/ManageDoctor/GetDoctorService";


interface Schedule {
    id: string;
    startDateTime: number;
    endDateTime: number;
    typeId: string;
    additionalInfo: string | null;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string | null;
    updatedDateTime: string | null;
    deletedBy: string | null;
    deletedDateTime: string | null;
  }
  
  interface MasterUser {
    id: string;
    masterGroupId: string | null;
    masterDashboardId: string | null;
    identityNumber: string;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string | null;
    phone: string;
    maritalStatus: string | null;
    gender: string | null;
    profileImage: string | null;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string | null;
    updatedDateTime: string | null;
    deletedBy: string | null;
    deletedDateTime: string | null;
  }
  
  interface EmployeeData {
    id: string;
    masterUserId: string;
    name: string;
    gender: string;
    address: string;
    phone: string;
    additionalInfo: string | null;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string;
    updatedDateTime: number;
    deletedBy: string | null;
    deletedDateTime: string | null;
    employeeNumber: string;
    birthDate: number[];
    role: string;
    masterUser: MasterUser;
  }
  
  interface DoctorDataItem {
    id: string;
    name: string;
    specialty: string;
    additionalInfo: string | null;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string;
    updatedDateTime: number;
    deletedBy: string | null;
    deletedDateTime: string | null;
    schedules: Schedule[];
    cost: number;
    parentClinicId: string;
    employeeData: EmployeeData;
    operationalSchedule?: OperationalSchedule;
  }

  type OperationalSchedule = {
    senin: string;
    selasa: string;
    rabu: string;
    kamis: string;
    jumat: string;
    sabtu: string;
    minggu: string;
  };

export default function useDetailDokter() {
    const [name, setName] = useState<string>("");
    const [deletedItems, setDeletedItems] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState<DoctorDataItem | null>(null); // Correct type for response
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [doctorData, setDoctorData] = useState<DoctorDataItem | null>(null);

    const breadcrumbItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Dokter",
            href: "/dokter",
        },
        {
            label: "Detail Dokter",
            href: "/detailDokter",
        },
    ];


    const convertSchedulesToReadableList = (schedules: Schedule[]) => {
              const defaultSchedule: OperationalSchedule = {
                senin: "",
                selasa: "",
                rabu: "",
                kamis: "",
                jumat: "",
                sabtu: "",
                minggu: "",
              };
            
              const daysMap: { [key: string]: keyof OperationalSchedule } = {
                Senin: "senin",
                Selasa: "selasa",
                Rabu: "rabu",
                Kamis: "kamis",
                Jumat: "jumat",
                Sabtu: "sabtu",
                Minggu: "minggu",
              };
          
              console.log("masuk convert",schedules);
            
              schedules.forEach((schedule) => {
                const startDay = dayjs(schedule.startDateTime).format("dddd"); // Day in English
                const startTime = dayjs(schedule.startDateTime).format("HH:mm");
                const endTime = dayjs(schedule.endDateTime).format("HH:mm");
          
            
                const mappedDay = daysMap[startDay] || ""; // Map to localized day name
            
                // Only update if mappedDay is valid
                if (mappedDay) {
                  defaultSchedule[mappedDay] = `${startTime} - ${endTime}`;
                }
              });
          
              console.log(defaultSchedule);
            
              return defaultSchedule;
            };
          
            const fetchData = async () => {
              setLoading(true);
              try {
                console.log(id);
                const ambulanceResponse = await GetDoctorServices(id); 
                const data = ambulanceResponse; // Access the data from the response
                const operationalSchedule = convertSchedulesToReadableList(data?.schedules || []);
                setDoctorData({ ...data, operationalSchedule} as DoctorDataItem);
                // const imagesData = data?.images || [];
                // const mappedImages = imagesData.map((image: ImageData) => ({
                //   imageName: image.imageName,
                //   imageType: image.imageType,
                //   imageData: `data:${image.imageType};base64,${image.imageData}`,
                // }));
          
                // setLargeImage(mappedImages[0]?.imageData || "");
                // setSmallImages(mappedImages.slice(1).map((img: ImageData) => img.imageData || ""));
              } catch (error) {
                console.error("Error fetching data:", error);
              } finally {
                setLoading(false);
              }
            };
          
            useEffect(() => {
              if (id) fetchData();
            }, [id]);
          
            const handleDeleteSuccess = () => {
              setOpen(false);
              navigate("/gedung", { state: { successDelete: true, message: "Gedung berhasil dihapus!" } });
            };
          
            const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
              event.preventDefault();
              setDeletedItems(buildingId);
              setOpen(true);
            };
          
          
            console.log(response);


    return {
        breadcrumbItems,
        name,
        deletedItems,
        doctorData,
        handleDeleteSuccess,
        confirmationDelete,
    }
        
}
