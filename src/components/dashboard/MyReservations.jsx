import { Table } from "antd";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: "30%",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: "40%",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export const MyReservations = () => {
  return (
    <div className="flex flex-col bg-slate-200 min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col items-center mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">Mis Reservaciones</h1>
        <div className="w-full lg:w-4/5 xl:w-3/4 2xl:w-2/3">
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
      </div>

      <Footer />
    </div>
  );
};
