import axios from "axios";



export const deleteService = async (BASE_URL: string, itemId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${itemId}`);
    if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`API responded with status: ${response.status}`);
      }
  } catch (error ) {
    throw error || { message: "Failed to delete building" };
  }
};
