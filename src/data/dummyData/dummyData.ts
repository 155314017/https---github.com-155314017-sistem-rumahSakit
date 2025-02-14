// src/data/dummyData.ts

export interface OperationalDateOption {
  label: string;
  value: string;
}

export const operationalDateOptions: OperationalDateOption[] = [
  { label: 'Monday, September 25, 2024 - 9:00 AM to 12:00 PM', value: '2024-09-25T09:00:00' },
  { label: 'Tuesday, September 26, 2024 - 1:00 PM to 4:00 PM', value: '2024-09-26T13:00:00' },
  // Add more options as needed
];

export const doctors = [
  { label: "Dr. Grayson Schonberg", value: "Dr. Grayson Schonberg" },
  { label: "Dr. Van Der Sar", value: "Dr. Van Der Sar" },
  { label: "Dr. Petr Cech", value: "Dr. Petr Cech" }
];
