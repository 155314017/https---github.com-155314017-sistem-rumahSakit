import axios from "axios";
import Cookies from "js-cookie";
import { BaseResponse } from "../../../types/api.types";
import { ImageItem } from "../../../types/images.types";

export interface ImageResponse {
  images: ImageItem[];
}

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/image`;

export const GetImageByParentId = async (parentId: string): Promise<BaseResponse<ImageItem[]>> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("No access token found");
  }

  try {
    const response = await axios.get<BaseResponse<ImageItem[]>>(`${BASE_URL}/${parentId}`, {
      headers: {
        "Content-Type": "application/json",
        accessToken: token
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}; 