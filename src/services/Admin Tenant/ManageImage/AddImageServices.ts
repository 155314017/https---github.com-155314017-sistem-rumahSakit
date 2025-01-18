import axios from "axios";
import Cookies from "js-cookie";

export interface ImageItem {
  imageName: string;
  imageType: string;
  imageData: string;
}

export interface ImageDataItems {
  parentId: string;
  images: ImageItem[];
}

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/image`;

// Function to create images for a specific parent
export const CreateImageService = async (imageRequest: ImageDataItems): Promise<ImageDataItems> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("No access token found.");
  }

  try {
    const response = await axios.post<ImageDataItems>(
      `${BASE_URL}`, 
      imageRequest, 
      {
        headers: {
          "Content-Type": "application/json", 
          accessToken: token,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating images:", error);
    throw error;  // Re-throw the error for handling by the caller
  }
};
