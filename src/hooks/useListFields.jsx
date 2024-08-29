import { useEffect, useState } from "react";
import { listFields as listFieldsRequest } from "../services";
import toast from "react-hot-toast";

export const useListFields = () => {
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await listFieldsRequest();

        if (data.error) {
          toast.error(
            data.message || "Exisitió un error al listar las canchas"
          );
          setError(data.message || "Existió un eror al listar las canchas");
        } else {
          setFields(data.fields);
          toast.success("Estas son las canchas disponibles");
        }
      } catch (e) {
        toast.error(
            "No se pudo conectar con el servidor" + e
        );
        setError(
            "No se pudo conectar con el servidor" + e
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
