import { CreateScheduleService } from './CreateScheduleService';
import { CreateExclusionScheduleService } from './ExclusionScheduleService';
import { GetScheduleByTypeId, ScheduleDataItem } from './GetScheduleByTypeIdServices';
import dayjs from 'dayjs';
import { EditScheduleService } from './EditScheduleService';

/**
 * Interface untuk data jadwal praktek
 * @property id - ID unik jadwal
 * @property startTime - Waktu mulai dalam format string
 * @property endTime - Waktu selesai dalam format string
 * @property selectedDay - Array hari yang dipilih dalam Bahasa Indonesia
 * @property notes - Catatan tambahan untuk jadwal
 * @property type - Tipe jadwal
 */
export interface PraktekData {
  id: string;
  startTime: string;
  endTime: string;
  selectedDay: string[];
  notes: string;
  type: string;
}

/**
 * Interface untuk data pengecualian jadwal
 * @property id - ID unik pengecualian
 * @property start - Tanggal mulai pengecualian
 * @property end - Tanggal selesai pengecualian (opsional)
 * @property title - Judul pengecualian
 * @property type - Tipe pengecualian
 * @property notes - Catatan untuk pengecualian
 * @property allDay - Flag untuk pengecualian sepanjang hari (opsional)
 */
export interface ExclusionData {
  id: string;
  start: string;
  end?: string;
  title: string;
  type: string;
  notes: string;
  allDay?: boolean;
}

/**
 * Interface untuk menggabungkan data jadwal praktek dan pengecualian
 * @property praktek - Array data jadwal praktek reguler
 * @property exclusion - Array data pengecualian jadwal
 */
export interface KalenderData {
  praktek: PraktekData[];
  exclusion: ExclusionData[];
}

/**
 * Interface untuk jadwal mingguan yang ditampilkan dalam tabel
 */
export interface WeeklySchedule {
  senin: string[];
  selasa: string[];
  rabu: string[];
  kamis: string[];
  jumat: string[];
  sabtu: string[];
  minggu: string[];
}

/**
 * Interface untuk jadwal operasional harian
 */
export interface OperationalSchedule {
  senin: string;
  selasa: string;
  rabu: string;
  kamis: string;
  jumat: string;
  sabtu: string;
  minggu: string;
}

/**
 * Mengkonversi waktu dari format 24 jam ke format 12 jam
 * @param time - Waktu dalam format 'HH:mm:ss'
 * @returns Waktu dalam format 'hh:mm a'
 */
const convertTo12HourFormat = (time: string): string => {
  return dayjs(time, 'HH:mm:ss').format('hh:mm a');
};

/**
 * Mengkonversi array waktu ke format string HH:mm
 * @param timeArray - Array waktu [jam, menit]
 * @returns String waktu dalam format HH:mm
 */
const convertArrayTimeToString = (timeArray: number[]): string => {
  return `${String(timeArray[0]).padStart(2, '0')}:${String(timeArray[1]).padStart(2, '0')}`;
};

/**
 * Mengkonversi data jadwal dari API ke format PraktekData
 * @param scheduleItem - Item jadwal dari API
 * @returns Data jadwal dalam format PraktekData
 */
const transformScheduleData = (scheduleItem: ScheduleDataItem): PraktekData => {
  const selectedDay = [];
  if (scheduleItem.monday) selectedDay.push('Senin');
  if (scheduleItem.tuesday) selectedDay.push('Selasa');
  if (scheduleItem.wednesday) selectedDay.push('Rabu');
  if (scheduleItem.thursday) selectedDay.push('Kamis');
  if (scheduleItem.friday) selectedDay.push('Jumat');
  if (scheduleItem.saturday) selectedDay.push('Sabtu');
  if (scheduleItem.sunday) selectedDay.push('Minggu');

  return {
    id: scheduleItem.id,
    startTime: convertArrayTimeToString(scheduleItem.startTime),
    endTime: convertArrayTimeToString(scheduleItem.endTime),
    selectedDay,
    notes: scheduleItem.additionalInfo,
    type: 'regular'
  };
};

/**
 * Mengambil dan mentransformasi data jadwal berdasarkan typeId
 * @param typeId - ID tipe (bisa berupa ID ambulance, dokter, ruangan, dll)
 * @param token - Token akses untuk API
 * @returns Promise yang mengembalikan array PraktekData
 */
export const getScheduleByTypeId = async (typeId: string): Promise<PraktekData[]> => {
  const schedules = await GetScheduleByTypeId(typeId);
  return schedules.map(transformScheduleData);
};

/**
 * Mengkonversi waktu dari format 12 jam ke format 24 jam untuk LocalTime
 * @param time - Waktu dalam format '07:00 am'
 * @returns Waktu dalam format '07:00:00'
 */
const convertTo24HourFormat = (time: string): string => {
  return dayjs(time, 'hh:mm a').format('HH:mm:00');
};

/**
 * Membuat jadwal berulang berdasarkan data yang diberikan
 * @param typeId - ID tipe (bisa berupa ID ambulance, dokter, ruangan, dll)
 * @param praktek - Array data jadwal praktek yang akan dibuat
 * @returns Promise yang mengembalikan hasil pembuatan jadwal
 */
export const createSchedules = async (typeId: string, praktek: PraktekData[]) => {
  console.log('[DEBUG] Input praktek data:', praktek);
  
  return Promise.all(praktek.map(async (jadwal) => {
    const scheduleData = {
      startTime: convertTo24HourFormat(jadwal.startTime),
      endTime: convertTo24HourFormat(jadwal.endTime),
      typeId: typeId,
      additionalInfo: jadwal.notes || '',
      maxCapacity: 1,
      monday: jadwal.selectedDay.includes('senin'),
      tuesday: jadwal.selectedDay.includes('selasa'),
      wednesday: jadwal.selectedDay.includes('rabu'),
      thursday: jadwal.selectedDay.includes('kamis'),
      friday: jadwal.selectedDay.includes('jumat'),
      saturday: jadwal.selectedDay.includes('sabtu'),
      sunday: jadwal.selectedDay.includes('minggu'),
      title: 'Jadwal Ambulance',
      description: jadwal.notes || ''
    };
    
    console.log('[DEBUG] Converted schedule data:', scheduleData);
    return CreateScheduleService(scheduleData);
  }));
};

/**
 * Membuat pengecualian jadwal untuk tanggal-tanggal tertentu
 * @param typeId - ID tipe (bisa berupa ID ambulance, dokter, ruangan, dll)
 * @param exclusions - Array data pengecualian yang akan dibuat
 * @returns Promise yang mengembalikan hasil pembuatan pengecualian jadwal
 */
export const createExclusions = async (typeId: string, exclusions: ExclusionData[]) => {
  if (!exclusions.length) return;

  return Promise.all(exclusions.map(async (exclusion) => {
    // Memisahkan tanggal dan waktu dari string ISO
    const startDateTime = dayjs(exclusion.start);
    const endDateTime = exclusion.end ? dayjs(exclusion.end) : startDateTime;

    const exclusionData = {
      additionalInfo: exclusion.notes || '',
      typeId: typeId,
      startDate: startDateTime.format('YYYY-MM-DD'),
      endDate: endDateTime.format('YYYY-MM-DD'),
      startTime: startDateTime.format('HH:mm:ss'),
      endTime: endDateTime.format('HH:mm:ss')
    };
    
    return CreateExclusionScheduleService(exclusionData);
  }));
};

/**
 * Memvalidasi input data kalender
 * @param kalenderData - Data kalender yang akan divalidasi
 * @throws Error jika tidak ada jadwal praktek yang diisi
 */
export const validateInput = (kalenderData: KalenderData) => {
  if (!kalenderData.praktek.length) {
    throw new Error('Minimal satu jadwal harus diisi');
  }
};

/**
 * Mentransformasi data jadwal ke format tabel mingguan
 * @param schedules - Array data jadwal dari API
 * @returns Data jadwal dalam format WeeklySchedule
 */
export const transformToWeeklySchedule = (schedules: ScheduleDataItem[]): WeeklySchedule => {
  const weeklySchedule: WeeklySchedule = {
    senin: [],
    selasa: [],
    rabu: [],
    kamis: [],
    jumat: [],
    sabtu: [],
    minggu: []
  };

  schedules.forEach(schedule => {
    const timeRange = `${convertArrayTimeToString(schedule.startTime)}- ${convertArrayTimeToString(schedule.endTime)}`;
    
    if (schedule.monday) weeklySchedule.senin.push(timeRange);
    if (schedule.tuesday) weeklySchedule.selasa.push(timeRange);
    if (schedule.wednesday) weeklySchedule.rabu.push(timeRange);
    if (schedule.thursday) weeklySchedule.kamis.push(timeRange);
    if (schedule.friday) weeklySchedule.jumat.push(timeRange);
    if (schedule.saturday) weeklySchedule.sabtu.push(timeRange);
    if (schedule.sunday) weeklySchedule.minggu.push(timeRange);
  });

  // Sort time ranges for each day
  Object.keys(weeklySchedule).forEach(day => {
    weeklySchedule[day as keyof WeeklySchedule].sort((a, b) => {
      const timeA = a.split('-')[0].trim();
      const timeB = b.split('-')[0].trim();
      return timeA < timeB ? -1 : 1;
    });
  });

  return weeklySchedule;
};

/**
 * Mengambil dan mentransformasi data jadwal ke format tabel mingguan
 * @param typeId - ID tipe (bisa berupa ID ambulance, dokter, ruangan, dll)
 * @param token - Token akses untuk API
 * @returns Promise yang mengembalikan data dalam format WeeklySchedule
 */
export const getWeeklySchedule = async (typeId: string): Promise<WeeklySchedule> => {
  const schedules = await GetScheduleByTypeId(typeId);
  return transformToWeeklySchedule(schedules);
};

/**
 * Mengkonversi data jadwal ke format jadwal operasional
 * @param schedules - Array data jadwal dari API
 * @returns Data jadwal dalam format OperationalSchedule
 */
export const convertToOperationalSchedule = (schedules: ScheduleDataItem[]): OperationalSchedule => {
  const defaultSchedule: OperationalSchedule = {
    senin: "-",
    selasa: "-",
    rabu: "-",
    kamis: "-",
    jumat: "-",
    sabtu: "-",
    minggu: "-",
  };

  // Temporary object untuk menyimpan array jadwal per hari
  const tempSchedules: { [key: string]: string[] } = {
    senin: [],
    selasa: [],
    rabu: [],
    kamis: [],
    jumat: [],
    sabtu: [],
    minggu: [],
  };

  schedules.forEach((schedule) => {
    // Format waktu dari array ke string
    const startTime = convertArrayTimeToString(schedule.startTime);
    const endTime = convertArrayTimeToString(schedule.endTime);
    const timeRange = `${startTime} - ${endTime}`;

    // Tambahkan jadwal ke array temporary
    if (schedule.monday) tempSchedules.senin.push(timeRange);
    if (schedule.tuesday) tempSchedules.selasa.push(timeRange);
    if (schedule.wednesday) tempSchedules.rabu.push(timeRange);
    if (schedule.thursday) tempSchedules.kamis.push(timeRange);
    if (schedule.friday) tempSchedules.jumat.push(timeRange);
    if (schedule.saturday) tempSchedules.sabtu.push(timeRange);
    if (schedule.sunday) tempSchedules.minggu.push(timeRange);
  });

  // Sort jadwal berdasarkan waktu dan gabungkan dengan newline
  Object.keys(tempSchedules).forEach((day) => {
    const sortedSchedules = tempSchedules[day].sort((a, b) => {
      const timeA = a.split(" - ")[0];
      const timeB = b.split(" - ")[0];
      return timeA.localeCompare(timeB);
    });
    
    if (sortedSchedules.length > 0) {
      defaultSchedule[day as keyof OperationalSchedule] = sortedSchedules.join("<br/>");
    }
  });

  return defaultSchedule;
};

/**
 * Mengedit jadwal yang sudah ada
 * @param scheduleId - ID jadwal yang akan diedit
 * @param typeId - ID tipe (bisa berupa ID ambulance, dokter, ruangan, dll)
 * @param jadwal - Data jadwal yang akan diperbarui
 * @returns Promise yang mengembalikan hasil edit jadwal
 */
export const editSchedule = async (scheduleId: string, typeId: string, jadwal: PraktekData) => {
  console.log('[DEBUG] Input edit praktek data:', jadwal);
  
  const scheduleData = {
    scheduleIntervalId: scheduleId,
    startTime: convertTo24HourFormat(jadwal.startTime),
    endTime: convertTo24HourFormat(jadwal.endTime),
    typeId: typeId,
    additionalInfo: jadwal.notes || '',
    maxCapacity: 1,
    monday: jadwal.selectedDay.includes('Senin'),
    tuesday: jadwal.selectedDay.includes('Selasa'),
    wednesday: jadwal.selectedDay.includes('Rabu'),
    thursday: jadwal.selectedDay.includes('Kamis'),
    friday: jadwal.selectedDay.includes('Jumat'),
    saturday: jadwal.selectedDay.includes('Sabtu'),
    sunday: jadwal.selectedDay.includes('Minggu'),
    title: 'Jadwal Ambulance',
    description: jadwal.notes || ''
  };
  
  console.log('[DEBUG] Converted edit schedule data:', scheduleData);
  return EditScheduleService(scheduleData);
};
