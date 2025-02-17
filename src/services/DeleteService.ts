import axios from "axios";
import Cookies from "js-cookie";

export const deleteService = async (BASE_URL: string, itemId: string) => {
  const accessToken = Cookies.get("accessToken"); // Ambil token dari cookies

  if (!accessToken) {
    throw new Error("Access token is missing. Please log in.");
  }

  try {
    // Mengirim request dengan token di header Authorization
    const response = await axios.delete(`${BASE_URL}/${itemId}`, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: accessToken
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    // Menangani error dan melemparkan pesan yang lebih spesifik
    throw error || { message: "Failed to delete item" };
  }
};
