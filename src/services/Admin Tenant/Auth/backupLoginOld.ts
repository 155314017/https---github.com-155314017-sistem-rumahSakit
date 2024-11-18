import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

interface CustomError extends Error {
  responseCode?: number;
}

// Fungsi login
const Login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "https://hms.3dolphinsocial.com:8083/v1/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { tokenValue, refreshTokenValue, name } = response.data.data;

    // Simpan accessToken dan refreshToken di cookies
    Cookies.set("accessToken", tokenValue, { expires: 7 }); // Expires in 7 days
    Cookies.set("refreshToken", refreshTokenValue, { expires: 7 });
    Cookies.set("name", name, { expires: 7 });

    return response.data;
  } catch (error: any) {
    const customError: CustomError = new Error(
      error.response?.data?.message || error.message || "Login failed"
    );
    customError.responseCode = error.response?.status;
    throw customError;
  }
};

// Fungsi untuk refresh token
const refreshAuthToken = async (): Promise<string | undefined> => {
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken) {
    throw new Error("Refresh token not found. Please login again.");
  }

  try {
    const response = await axios.post(
      "https://hms.3dolphinsocial.com:8083/v1/auth/refresh-token",
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newAccessToken = response.data.data.tokenValue;
    Cookies.set("accessToken", newAccessToken, { expires: 7 }); // Perbarui accessToken di cookies

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return undefined; // Return undefined instead of null
  }
};

// Interceptor untuk request yang membutuhkan access token
axios.interceptors.request.use(
  async (config) => {
    let accessToken: string | undefined = Cookies.get("accessToken");

    // Cek jika token tidak ada atau sudah kedaluwarsa (kamu bisa menambahkan logika kedaluwarsa di sini)
    if (!accessToken) {
      accessToken = await refreshAuthToken();

      if (!accessToken) {
        throw new Error("Unable to refresh token. Please login again.");
      }
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default Login;
