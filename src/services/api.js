import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://sportsfieldmanager.vercel.app/sportsFieldManager/v1`,
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (data) => {
  try {
    const response = await apiClient.post("auth/login", data);
    return response.data;
  } catch (e) {
    console.log(e.response?.data);

    const errorResponse = e.response?.data;

    if (Array.isArray(errorResponse?.errors)) {
      const errorMessage =
        errorResponse.errors[0]?.msg || "An error occurred while logging in.";
      return {
        error: true,
        message: errorMessage,
      };
    }

    const errorMessage =
      errorResponse?.error || "An error occurred while logging in.";

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

    const response = await apiClient.post("auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e) {

    const errorResponse = e.response?.data;

    if (Array.isArray(errorResponse?.errors)) {
      const errorMessage =
        errorResponse.errors[0]?.msg || "An error occurred while registering.";
      return {
        error: true,
        message: errorMessage,
      };
    }

    const errorMessage =
      errorResponse?.msg || "An error occurred while registering.";

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
        errorResponse.errors[0]?.msg ||
        "An error occurred while listing fields.";
      return {
        error: true,
        message: errorMessage,
      };
    }

    const errorMessage =
      errorResponse?.msg || "An error occurred while listing fields.";

    return {
      error: true,
      message: errorMessage,
    };
  }
};

export const listReservations = async () => {
  try {
    const userDetails = localStorage.getItem("user");
    const uid = userDetails ? JSON.parse(userDetails).uid : null;

    const response = await apiClient.get("/reservation/myReservations", {
      params: { uid },
    });
    return response.data;
  } catch (e) {
    const errorResponse = e.response?.data;

    if (Array.isArray(errorResponse?.errors)) {
      const errorMessage =
        errorResponse.errors[0]?.msg ||
        "An error occurred while listing reservations.";
      return {
        error: true,
        message: errorMessage,
      };
    }

    const errorMessage =
      errorResponse?.msg || "An error occurred while listing reservations.";

    console.log(errorMessage);

    return {
      error: true,
      message: errorMessage,
    };
  }
};

export const createReservation = async (data) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const response = await apiClient.post("/reservation/addReservation", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e) {
    const errorResponse = e.response?.data;

    if (Array.isArray(errorResponse?.errors)) {
      const errorMessage =
        errorResponse.errors[0]?.msg ||
        "An error occurred while creating the reservation.";
      return {
        error: true,
        message: errorMessage,
      };
    }

    const errorMessage =
      errorResponse?.msg || "An error occurred while creating the reservation.";

    return {
      error: true,
      message: errorMessage,
    };
  }
};