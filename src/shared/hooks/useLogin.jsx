import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (payload) => {
    setIsLoading(true);

    try {
      const data = await loginRequest(payload);

      if (data.error) {
        toast.error(data.message || "Existió un error al iniciar sesión");
      } else {
        const { userDetails } = data;
        localStorage.setItem("user", JSON.stringify(userDetails));
        toast.success("Login exitoso!");
        navigate("/");
      }
    } catch (error) {
      toast.error("No se pudo conectar con el servidor. Intenta de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
};
