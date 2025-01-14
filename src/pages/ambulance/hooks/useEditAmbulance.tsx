/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import 'dayjs/locale/id'
import { EditAmbulanceServices } from '../../../services/Admin Tenant/ManageAmbulance/EditAmbulanceServices'
import { getAmbulanceByIdService } from '../../../services/Admin Tenant/ManageAmbulance/GetAmbulanceByIdService'

interface FormValues {
  operationalCost: number
}

type ImageData = {
  imageName: string
  imageType: string
  imageData: string
}


type Schedule = {
  day: string
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
}

export default function useEditAmbulance() {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null)
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const { id } = useParams()
  const [apiUrl, setApiUrl] = useState('')
  const [initialOperationalCost, setInitialOperationalCost] = useState<number>(0)
  const [errorAlert, setErrorAlert] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>('1')
  const [selectedDays, setSelectedDays] = useState<string>('1')
  // const [schedule, setSchedule] = useState<Schedule[]>([])
  const [schedules, setSchedules] = useState<any[]>([]);
  // const [editingIndex, setEditingIndex] = useState<number | null>(null);
  dayjs.locale('id')
  const navigate = useNavigate();
  // const [operationalSchedule, setOperationalSchedule] = useState<string[]>([]);
  const [updatedAmbulanceData, setUpdatedAmbulanceData] = useState<any>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [statusEdit, setStatusEdit] = useState(false);


  const dayMapping: { [key: string]: number } = {
    Senin: 1, // Monday
    Selasa: 2, // Tuesday
    Rabu: 3,   // Wednesday
    Kamis: 4,   // Thursday
    Jumat: 5,   // Friday
    Sabtu: 6,   // Saturday
    Minggu: 0   // Sunday
  }

  useEffect(() => {
    if (startTime && endTime) {
      const dayOfWeek = dayjs(startTime).format('dddd'); // Get day name
      
      
      
      const dayMapping: { [key: string]: string } = {
        Senin: '1',
        Selasa: '2',
        Rabu: '3',
        Kamis: '4',
        Jumat: '5',
        Sabtu: '6',
        Minggu: '7'
      };
  
      const dayValue = dayMapping[dayOfWeek] || '7'; // Map day to corresponding value
      setSelectedDays(dayValue); // Set selected day
  
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime]);
  
  // Fetch data with Unix timestamps using dayjs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAmbulanceByIdService(id);
        const data = response;
  
        setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/${id}`);
        setInitialOperationalCost(data?.cost || 0);
  
        const convertUnixToReadableTime = (timestamp: number) => {
          const date = dayjs(timestamp); // Use dayjs to parse Unix timestamp
  
          const dayOfWeek = date.format('dddd'); // Get the day of the week
          const time = date.format('HH:mm'); // Get the formatted time (HH:mm)
  
          return { day: dayOfWeek, time };
        };
  
        const schedules = data?.schedules || [];
        const formattedSchedules = schedules.map(schedule => {
          const start = convertUnixToReadableTime(schedule.startDateTime);
          const end = convertUnixToReadableTime(schedule.endDateTime);
  
          return {
            id: schedule.id,
            day: start.day, // Extracted day from the timestamp
            startTime: start.time, // Extracted start time
            endTime: end.time, // Extracted end time
          };
        });
  
        setSchedules(formattedSchedules);
        setImagesData(data?.images || []);
  
  
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("Updated schedules:", schedules);  // Log the state when it changes
  }, [schedules]);
  

  const formik = useFormik<FormValues>({
    initialValues: {
      operationalCost: initialOperationalCost || 0
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      operationalCost: Yup.number()
        .required('Operational Cost is required')
        .positive('Must be a positive number')
    }),
    onSubmit: async (values) => {
      const formattedSchedules = schedules.map(schedule => {
        const normalizedDay = schedule.day.trim().charAt(0).toUpperCase() + schedule.day.slice(1).toLowerCase();
        const selectedDayOfWeek = dayMapping[normalizedDay];
    
        const parsedStartTime = dayjs(schedule.startTime, 'HH:mm', true);
        const parsedEndTime = dayjs(schedule.endTime, 'HH:mm', true);
    
        const referenceDate = dayjs().startOf('week');
    
        const startDateTime = referenceDate
          .day(selectedDayOfWeek)
          .set('hour', parsedStartTime.hour())
          .set('minute', parsedStartTime.minute())
          .set('second', 0)
    
        const endDateTime = referenceDate
          .day(selectedDayOfWeek)
          .set('hour', parsedEndTime.hour())
          .set('minute', parsedEndTime.minute())
          .set('second', 0)
    
        return {
          startDateTime: startDateTime.valueOf(),
          endDateTime: endDateTime.valueOf()
        };
      }).filter(schedule => schedule !== null);
    
      const data = {
        ambulanceId: id,
        number: '999',
        status: 'ACTIVE',
        additionalInfo: 'hi',
        cost: values.operationalCost,
        schedules: formattedSchedules,
        images: imagesData.map(image => ({
          imageName: image.imageName || '',
          imageType: image.imageType || '',
          imageData: image.imageData || ''
        }))
      };
    
    
      try {
        const response = await EditAmbulanceServices(data);
        setUpdatedAmbulanceData(response);
        navigate('/ambulance', {
          state: { successEdit: true, message: 'Ambulance updated successfully!' }
        });
      } catch (error) {
        setErrorAlert(true);
        console.error('Error submitting form:', error);
      }
    }
  })
  

  const handleAddSchedule = () => {
    if (startTime && endTime && selectedDay) {
      const newSchedule: Schedule = {
        day: selectedDay,
        startTime: startTime,
        endTime: endTime,
      };
      setSchedules([...schedules, newSchedule]); // Add new schedule to the array
      setStartTime(null); // Reset start time
      setEndTime(null); // Reset end time
      setSelectedDay(null); // Reset selected day
    }
  };

  const handleImageChange = (images: ImageData[]) => {
    setImagesData(images)
  }

  function handleEditSchedule(index: number) {
    setStatusEdit(true);
    const scheduleToEdit = schedules[index];
    
  
    if (scheduleToEdit) {
      try {
        // Map day names to numeric values
        const dayMap: Record<string, string> = {
          'Senin': '1',
          'Selasa': '2',
          'Rabu': '3',
          'Kamis': '4',
          'Jumat': '5',
          'Sabtu': '6',
          'Minggu': '7',
        };
  
        // Check if the day from scheduleToEdit exists in the map
        const mappedDayValue = dayMap[scheduleToEdit.day];
  
        if (mappedDayValue) {
          setSelectedDay(mappedDayValue); // Set numeric value for dropdown
        } else {
          return; // Exit the function if the day is invalid
        }
  
        // Parse start and end times correctly
        const parsedStartTime = dayjs(scheduleToEdit.startTime, 'HH:mm');
        const parsedEndTime = dayjs(scheduleToEdit.endTime, 'HH:mm');
  
        if (parsedStartTime.isValid() && parsedEndTime.isValid()) {
          setStartTime(parsedStartTime); // Set start time in the time picker (formatted as string)
          setEndTime(parsedEndTime); // Set end time in the time picker (formatted as string)
        } 
        setEditingIndex(index); // Set editing index to identify the schedule being edited
      } catch (error) {
        console.error("Error parsing schedule times:", error);
      }
    } else {
      console.error("Schedule not found for index:", index);
    }
  }
  

  
 
  
  
 
  
  const handleSaveAndAddDay = () => {
    // Ensure all fields are filled out before saving
    if (!selectedDay || !startTime || !endTime) {
      console.error("Please complete all fields before saving.");
      return;
    }
  
    // Parse the times as Dayjs objects in the correct timezone
    const parsedStartTime = dayjs(startTime, "HH:mm", true);
    const parsedEndTime = dayjs(endTime, "HH:mm", true);
  
    // Check if the parsed times are valid
    if (!parsedStartTime.isValid()) {
      console.error("Invalid start time format:", startTime);
      return;
    }
    if (!parsedEndTime.isValid()) {
      console.error("Invalid end time format:", endTime);
      return;
    }
  
    // Validate that the start time is before the end time
    if (parsedStartTime.isAfter(parsedEndTime)) {
      // Handle the case where the schedule crosses midnight
      parsedEndTime.add(1, 'day'); // Add one day to the end time if it crosses midnight
    }
  
    // Define the mapping of days
    const dayMapping = {
      "1": "Senin",
      "2": "Selasa",
      "3": "Rabu",
      "4": "Kamis",
      "5": "Jumat",
      "6": "Sabtu",
      "7": "Minggu",
    };
  
    // Validate and get the formatted day
    if (!Object.keys(dayMapping).includes(selectedDay)) {
      console.error("Invalid day selected:", selectedDay);
      return;
    }
  
    // Explicitly cast selectedDay as keyof typeof dayMapping
    const formattedDay = dayMapping[selectedDay as keyof typeof dayMapping];
  
    // Get today's date and set the correct year/month/day to calculate the correct date
    const today = dayjs();
  
    // Generate the full date with correct day of the week, keeping the time portion intact
    const startDateTime = today
      .day(parseInt(selectedDay)) // Set the day of the week
      .hour(parsedStartTime.hour()) // Set the hour of the start time
      .minute(parsedStartTime.minute()) // Set the minute of the start time
      .second(0) // Reset seconds for accuracy
      .millisecond(0); // Reset milliseconds for accuracy
  
    const endDateTime = today
      .day(parseInt(selectedDay)) // Set the day of the week
      .hour(parsedEndTime.hour()) // Set the hour of the end time
      .minute(parsedEndTime.minute()) // Set the minute of the end time
      .second(0) // Reset seconds
      .millisecond(0); // Reset milliseconds
  
    // If end time is earlier than start time, increment the end day by 1
    if (parsedEndTime.isBefore(parsedStartTime)) {
      endDateTime.add(1, 'day');
    }
  
    // Ensure that the start time is before the end time
    if (startDateTime.isAfter(endDateTime)) {
      console.error("Start time cannot be after end time.");
      return;
    }
  
    // Create the new schedule object
    const newSchedule = {
      day: formattedDay,
      startTime: parsedStartTime.format("HH:mm"),
      endTime: parsedEndTime.format("HH:mm"),
      startDateTime: startDateTime.valueOf(), // Use the Unix timestamp for start time
      endDateTime: endDateTime.valueOf(), // Use the Unix timestamp for end time
    };
  
    // Update the schedules array
    setSchedules((prevSchedules) => {
      if (editingIndex !== null) {
        // Update the schedule at the specific index
        const updatedSchedules = [...prevSchedules];
        updatedSchedules[editingIndex] = newSchedule;
        return updatedSchedules;
      } else {
        // Add the new schedule
        return [...prevSchedules, newSchedule];
      }
    });
  
    // Clear the input fields and reset editing index
    setSelectedDay("");
    setStartTime(null);
    setEndTime(null);
    setEditingIndex(null);
  };
  
  
  
   
  
  
  
  
  
  
  const handleDeleteSchedule = (index: number) => {
    // Logic to delete the schedule at the specified index
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    // Update the schedules state in your hook or component
    // Assuming you have a method to set schedules in your hook
    setSchedules(updatedSchedules);
  };


  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Ambulance', href: '/ambulance' },
    { label: 'Edit Ambulance', href: `/editAmbulance/${id}` }
  ]
  return {
    formik,
    handleImageChange,
    imagesData,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    errorAlert,
    setErrorAlert,
    breadcrumbItems,
    apiUrl,
    selectedDays,
    initialOperationalCost,
    handleDeleteSchedule,
    handleEditSchedule,
    schedules, 
    updatedAmbulanceData,
    handleAddSchedule,
    setImagesData,
    handleSaveAndAddDay,
    statusEdit
  }
}
