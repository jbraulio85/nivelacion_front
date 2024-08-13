// src/hooks/useReservation.js
import { useState } from "react";
import { createReservation as createReservationRequest } from "../../services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createReservation = async (fieldId, uid, startTime, endTime, payment) => {
    setIsLoading(true);

    try {
      const data = await createReservationRequest({ fieldId, uid, startTime, endTime, payment });

      if (data.error) {
        toast.error(data.message || "Existió un error al realizar la reserva");
      } else {
        toast.success("Reserva realizada con éxito!");
        navigate("/myReservations");
      }
    } catch (error) {
      toast.error("No se pudo conectar con el servidor. Intenta de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createReservation,
    isLoading,
  };
};
