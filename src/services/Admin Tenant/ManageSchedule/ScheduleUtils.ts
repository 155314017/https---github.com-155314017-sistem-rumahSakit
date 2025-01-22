import { CreateScheduleService } from './CreateScheduleService';
import { CreateExclusionScheduleService } from './ExclusionScheduleService';
import { GetScheduleByTypeId, ScheduleDataItem } from './GetScheduleByTypeIdServices';
import dayjs from 'dayjs';

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
 * Mengkonversi waktu dari format 24 jam ke format 12 jam
 * @param time - Waktu dalam format 'HH:mm:ss'
 * @returns Waktu dalam format 'hh:mm a'
 */
const convertTo12HourFormat = (time: string): string => {
  return dayjs(time, 'HH:mm:ss').format('hh:mm a');
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
    startTime: convertTo12HourFormat(scheduleItem.startTime),
    endTime: convertTo12HourFormat(scheduleItem.endTime),
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
    const exclusionData = {
      additionalInfo: exclusion.notes || '',
      scheduleDate: exclusion.start,
      typeId: typeId
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
    const timeRange = `${dayjs(schedule.startTime, 'HH:mm:ss').format('HH:mm')}- ${dayjs(schedule.endTime, 'HH:mm:ss').format('HH:mm')}`;
    
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
      const timeA = dayjs(a.split('-')[0], 'HH:mm');
      const timeB = dayjs(b.split('-')[0], 'HH:mm');
      return timeA.isBefore(timeB) ? -1 : 1;
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
