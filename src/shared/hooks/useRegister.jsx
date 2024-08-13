import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services";
import toast from "react-hot-toast";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (email, username, password, name, surname, profilePicture) => {
    setIsLoading(true);

    try {
      const data = await registerRequest({ email, username, password, name, surname, profilePicture });

      if (data.error) {
        toast.error(data.message || "Existió un error al registrarse");
      } else {
        toast.success("Registro exitoso!");
        navigate("/");
      }
    } catch (error) {
      toast.error("No se pudo conectar con el servidor. Intenta de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
  };
};