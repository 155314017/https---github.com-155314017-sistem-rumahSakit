import axios from 'axios';

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phoneNumber: string;
  maritalStatus: string;
  gender: string;
  address: string;
  identityNumber: string;
}

// Fungsi untuk mengupdate data pengguna
export const CreateUser = async (userData: UserData) => {
  try {
    // Mendapatkan URL dari environment variable
    const apiUrl = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/user/`;

    // Mengirimkan data ke API
    const response = await axios.post(apiUrl, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Mengecek hasil response
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update user data');
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error; // Mengembalikan error untuk ditangani oleh pemanggil
  }
};
