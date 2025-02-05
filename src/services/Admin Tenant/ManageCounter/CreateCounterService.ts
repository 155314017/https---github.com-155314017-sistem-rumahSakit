import axios from "axios";
import Cookies from 'js-cookie';
import { BaseResponse } from '../../../types/api';

export interface CreateCounterRequest {
  name: string;
  location: string;
  additionalInfo: string;
 }

export interface CounterDataItem {
  id: string;
  name: string;
  location: string;
  queueNumber: number;
  additionalInfo: string;
  masterTypeId: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
}

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/counter/`;

export const createCounter = async (
  counterData: CreateCounterRequest
): Promise<BaseResponse<CounterDataItem>> => {
  const token = Cookies.get('accessToken');

  if (!token) {
    throw new Error('No access token found.');
  }

  try {
    const response = await axios.post<BaseResponse<CounterDataItem>>(
      BASE_URL,
      counterData,
      {
        headers: {
          accessToken: token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating counter:", error);
    throw error;
  }
};
