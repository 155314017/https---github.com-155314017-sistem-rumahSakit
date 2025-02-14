export interface Exclusion {
  id: number
  date: string
  type: string
  time: string
}

export interface PraktekData {
  id: string
  startTime: string
  endTime: string
  selectedDay: string[]
  notes: string
  type: string
}

export interface ExclusionData {
  id: string
  start: string
  end?: string
  title: string
  type: string
  notes: string
  allDay?: boolean
}

export interface KalenderData {
  praktek: PraktekData[]
  exclusion: ExclusionData[]
}

export interface Event {
  id: string
  title: string
  start: string
  end?: string
  allDay?: boolean
  type?: string
  notes?: string
  color?: string
  textColor?: string
  borderColor?: string
  startTime?: string
  endTime?: string
  senin?: boolean
  selasa?: boolean
  rabu?: boolean
  kamis?: boolean
  jumat?: boolean
  sabtu?: boolean
  minggu?: boolean
}

export interface Session {
  id: string
  startTime: string
  endTime: string
  selectedDays: string[]
  notes: string
}
