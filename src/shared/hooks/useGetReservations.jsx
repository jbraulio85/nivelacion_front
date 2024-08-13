import { useState, useEffect } from 'react';
import { listReservations } from '../../services';
import toast from 'react-hot-toast';

export const useGetReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await listReservations();

        if (response && Array.isArray(response.reservations)) {
          setReservations(response.reservations);
        } else if (response && response.message) {
          setError(response.message);
          toast.error(response.message);
        } else {
          setError('Unexpected response format');
          toast.error('Unexpected response format');
        }
      } catch (e) {
        const errorMessage = e.message || 'Error al listar las reservaciones';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { reservations, loading, error };
};
