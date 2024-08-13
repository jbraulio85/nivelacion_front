import { useState, useEffect } from "react";
import { listFields as fetchFields } from "../../services";
import toast from "react-hot-toast";

export const useListFields = () => {
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchFields();

        if (data.error) {
          toast.error(data.message || "Existió un error al listar las canchas");
          setError(data.message || "Existió un error al listar las canchas");
        } else {
          setFields(data.fields);
          toast.success("Canchas listadas exitosamente!");
        }
      } catch (error) {
        toast.error(
          "No se pudo conectar con el servidor. Intenta de nuevo más tarde."
        );
        setError(
          "No se pudo conectar con el servidor. Intenta de nuevo más tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    fields,
    isLoading,
    error,
  };
};
