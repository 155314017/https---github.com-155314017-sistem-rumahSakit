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
  const [edit, setEdit] = useState(false);
  dayjs.locale('id')
  const navigate = useNavigate();
  const [operationalSchedule, setOperationalSchedule] = useState<string[]>([]);
  const [updatedAmbulanceData, setUpdatedAmbulanceData] = useState<any>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);


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
      const formattedStartTime = startTime.format('HH:mm')
      const formattedEndTime = endTime.format('HH:mm')
      const dayOfWeek = startTime.format('dddd')
      console.log(errorAlert)
      console.log(formattedStartTime)
      console.log(formattedEndTime)
      const dayMapping: { [key: string]: string } = {
        Senin: '1',
        Selasa: '2',
        Rabu: '3',
        Kamis: '4',
        Jumat: '5',
        Sabtu: '6',
        Minggu: '7'
      }

      const dayValue = dayMapping[dayOfWeek] || '7'
      setSelectedDays(dayValue)
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ambulance data by ID
        const response = await getAmbulanceByIdService(id);
        const data = response;
  
        // Set API URL and initial operational cost
        setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/${id}`);
        setInitialOperationalCost(data?.cost || 0);
  
        // Convert Unix timestamp to human-readable time format
        const convertUnixToReadableTime = (timestamp: number) => {
          const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds

          const dayOfWeek = date.getDay();
          const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
          const day = dayNames[dayOfWeek];
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');

          const time = `${hours}:${minutes}`;
          return { day, time };
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
        // Set the state for schedules and images
        setSchedules(formattedSchedules);
        setImagesData(data?.images || []);
  
        console.log("Formatted schedules", formattedSchedules);
  
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
        const normalizedDay = schedule.day.trim().charAt(0).toUpperCase() + schedule.day.slice(1).toLowerCase()
  
        const selectedDayOfWeek = dayMapping[normalizedDay]
  
        if (selectedDayOfWeek === undefined) {
          console.error('Invalid selectedDayOfWeek:', normalizedDay)
          return null
        }
  
        const parsedStartTime = dayjs(schedule.startTime, 'HH:mm', true)
        const parsedEndTime = dayjs(schedule.endTime, 'HH:mm', true)
  
        if (!parsedStartTime.isValid() || !parsedEndTime.isValid()) {
          console.error('Invalid time format:', schedule.startTime, schedule.endTime)
          return null
        }
  
        const referenceDate = dayjs().startOf('week')
  
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
  
        if (!startDateTime.isValid() || !endDateTime.isValid()) {
          console.error('Failed to set day for times:', startDateTime.toString(), endDateTime.toString())
          return null
        }
  
        // Convert startDateTime and endDateTime to UNIX timestamps (milliseconds)
        return {
          startDateTime: startDateTime.valueOf(), // Convert to number (timestamp)
          endDateTime: endDateTime.valueOf() // Convert to number (timestamp)
        }
      }).filter(schedule => schedule !== null)
  
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
      }
  
      try {
        const response = await EditAmbulanceServices(data)
        setUpdatedAmbulanceData(response)
        navigate('/ambulance', {
          state: { successEdit: true, message: 'Ambulance updated successfully!' }
        })
      } catch (error) {
        console.error('Error editing ambulance:', error)
        setErrorAlert(true)
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
    const scheduleToEdit = schedules[index];
    console.log("Editing schedule at index:", index);
    console.log("Schedule to edit:", scheduleToEdit);
  
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
          console.log("Selected day after mapping:", mappedDayValue); // Debugging line
        } else {
          console.error("Invalid day name:", scheduleToEdit.day);
          return; // Exit the function if the day is invalid
        }
  
        // Parse start and end times correctly
        const parsedStartTime = dayjs(scheduleToEdit.startTime, 'HH:mm');
        const parsedEndTime = dayjs(scheduleToEdit.endTime, 'HH:mm');
  
        if (parsedStartTime.isValid() && parsedEndTime.isValid()) {
          setStartTime(parsedStartTime); // Set start time in the time picker (formatted as string)
          setEndTime(parsedEndTime); // Set end time in the time picker (formatted as string)
        } else {
          console.error("Invalid time format in schedule:", scheduleToEdit);
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
    console.error('Please complete all fields before saving.');
    return;
  }

  // Parse the times as Dayjs objects
  const parsedStartTime = dayjs(startTime, 'HH:mm');
  const parsedEndTime = dayjs(endTime, 'HH:mm');

  // Validate the times before proceeding
  if (parsedStartTime.isValid() && parsedEndTime.isValid()) {
    console.log('Start Hour:', parsedStartTime.hour());
    console.log('End Hour:', parsedEndTime.hour());

    // Standardize day format (if necessary)
    let formattedDay = selectedDay;

    if (formattedDay === '1') formattedDay = 'Senin';
    else if (formattedDay === '2') formattedDay = 'Selasa';
    else if (formattedDay === '3') formattedDay = 'Rabu';
    else if (formattedDay === '4') formattedDay = 'Kamis';
    else if (formattedDay === '5') formattedDay = 'Jumat';
    else if (formattedDay === '6') formattedDay = 'Sabtu';
    else if (formattedDay === '7') formattedDay = 'Minggu';

    const newSchedule = {
      day: formattedDay,
      startTime: parsedStartTime.format('HH:mm'),
      endTime: parsedEndTime.format('HH:mm'),
    };

    if (editingIndex !== null) {
      // If editing, update the schedule at the specific index
      setSchedules((prevSchedules) => {
        const updatedSchedules = [...prevSchedules];
        updatedSchedules[editingIndex] = newSchedule; // Update the schedule at the editing index
        return updatedSchedules;
      });
      console.log('Updated Schedule:', newSchedule);
    } else {
      // If not editing (editingIndex is null), add a new schedule
      setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
      console.log('Saved New Schedule:', newSchedule);
    }

    // Optionally, clear the input fields after saving
    setSelectedDay('');
    setStartTime(null);
    setEndTime(null);
    setEditingIndex(null);  // Reset the editingIndex after save
  } else {
    console.error('Invalid time format');
  }
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
    operationalSchedule,
    handleDeleteSchedule,
    handleEditSchedule,
    edit,
    schedules, // Expose the schedules array
    updatedAmbulanceData,
    handleAddSchedule,
    setImagesData,
    handleSaveAndAddDay
  }
}
