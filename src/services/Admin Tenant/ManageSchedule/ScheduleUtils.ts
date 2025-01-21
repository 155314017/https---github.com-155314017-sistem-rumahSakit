import { CreateScheduleService } from './CreateScheduleService';
import { CreateExclusionScheduleService } from './ExclusionScheduleService';
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
