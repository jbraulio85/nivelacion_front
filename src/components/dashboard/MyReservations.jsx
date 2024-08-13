import { Table } from 'antd';
import { Navbar } from "../Navbar";
import { Footer } from "./Footer";
import { useGetReservations } from "../../shared/hooks";

const columns = [
  {
    title: 'Nombre del Campo',
    dataIndex: 'fieldName',
    sorter: (a, b) => a.fieldName.localeCompare(b.fieldName),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Fecha',
    render: (text, record) => {
      const date = new Date(record.startTime).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
      return date.charAt(0).toUpperCase() + date.slice(1); // Capitaliza la primera letra
    },
    sorter: (a, b) => new Date(a.startTime) - new Date(b.startTime),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Hora de Inicio',
    render: (text, record) => {
      return new Date(record.startTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    },
    sorter: (a, b) => new Date(a.startTime) - new Date(b.startTime),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Hora de Fin',
    render: (text, record) => {
      return new Date(record.endTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    },
    sorter: (a, b) => new Date(a.endTime) - new Date(b.endTime),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Estado',
    dataIndex: 'status',
    filters: [
      { text: 'Pendiente', value: 'pending' },
      { text: 'Confirmado', value: 'confirmed' },
      { text: 'Cancelado', value: 'cancelled' },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const MyReservations = () => {
  const { reservations, loading, error } = useGetReservations();

  if (loading) {
    return (
      <div className="flex flex-col bg-slate-200 min-h-screen">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <p>Cargando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-slate-200 min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col items-center mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">Mis Reservaciones</h1>
        <div className="w-full lg:w-4/5 xl:w-3/4 2xl:w-2/3">
          {error ? (
            <div className="text-center text-xl text-red-500">{error}</div>
              
          ) : (
            <Table
              columns={columns}
              dataSource={reservations.map((reservation, index) => ({
                ...reservation,
                key: reservation._id || `${reservation.startTime}-${index}`
              }))}
              onChange={onChange}
              scroll={{ x: 'max-content' }} // Agrega scroll horizontal en pantallas grandes si es necesario
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
