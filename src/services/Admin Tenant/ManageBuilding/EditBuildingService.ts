import axios from "axios";
import Cookies from "js-cookie";

export interface BuildingDataItem {
  id: string;
  name: string;
  address: string;
  additionalInfo: string;
  images: { imageName: string; imageType: string; imageData: string }[];
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
}

const API_URL = "https://hms.3dolphinsocial.com:8083/v1/manage/building/";

// Function to create a building
export const EditBuildingService = async (data: {
  name: string;
  address: string;
  additionalInfo: string;
  images: { imageName: string; imageType: string; imageData: string }[];
}): Promise<BuildingDataItem> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("No access token found.");
  }

  try {
    const response = await axios.put<BuildingDataItem>(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        accessToken: token,
      },
    });

    if (response.status === 200) {
      console.log("API connection successful:", response.data);
      
      // Log the created building data for debugging
      console.log("Building ID:", response.data.id);
      console.log("Name:", response.data.name);
      console.log("Address:", response.data.address);
      console.log("Additional Info:", response.data.additionalInfo);
      console.log("Created By:", response.data.createdBy);
      console.log("Created Date Time:", new Date(response.data.createdDateTime * 1000).toLocaleString());
      console.log("Images:", response.data.images);
      console.log("----------------------------");

      return response.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating building:", error);
    throw error;  // Re-throw the error for handling by the caller
  }
};
