import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building`;

export const deleteBuildingService = async (buildingId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${buildingId}`);
    if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`API responded with status: ${response.status}`);
      }
  } catch (error ) {
    throw error || { message: "Failed to delete building" };
  }
};
