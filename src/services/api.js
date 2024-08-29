import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://sportsfieldmanager.vercel.app/sportsFieldManager/v1",
  timeout: 5000,
});

export const login = async (data) => {
  try {
    const response = await apiClient.post("/auth/login", data);

    return response.data;
  } catch (e) {
    const errorResponse = e.response?.data;

    if (Array.isArray(errorResponse?.errors)) {
      const errorMessage =
        errorResponse.errors[0]?.msg || "Error al iniciar sesión";
      return {
        error: true,
        message: errorMessage,
      };
    }

    const errorMessage = errorResponse?.error || "Error al iniciar sesión";

    return {
      error: true,
      message: errorMessage,
    };
  }
};

export const register = async (data) => {
  try {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    const response = await apiClient.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e) {
    const errorResponse = e.response?.data;

    if (Array.isArray(errorResponse?.errors)) {
      const errorMessage =
        errorResponse.errors[0]?.msg || "Error al iniciar sesión";
      return {
        error: true,
        message: errorMessage,
      };
    }

    const errorMessage = errorResponse?.error || "Error al iniciar sesión";

    return {
      error: true,
      message: errorMessage,
    };
  }
};

export const listFields = async () => {
  try {
    const response = await apiClient.get("/field/getFields");

    return response.data;
  } catch (e) {
    const errorResponse = e.response?.data;

    if (Array.isArray(errorResponse?.errors)) {
      const errorMessage =
        errorResponse.errors[0]?.msg || "Error al iniciar sesión";
      return {
        error: true,
        message: errorMessage,
      };
    }

    const errorMessage = errorResponse?.error || "Error al iniciar sesión";

    return {
      error: true,
      message: errorMessage,
    };
  }
};