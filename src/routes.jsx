import { DashboardPage } from "./pages/DashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AuthPage } from "./pages/AuthPage";
import { Fields } from "./components/dashboard/Fields";
import { MyReservations } from "./components/dashboard/MyReservations";
import { PrivateRoute } from "./components/PrivateRoute";

const routes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/", element: <DashboardPage /> },
  { path: "/fields", element: <Fields /> },
  {
    path: "/myReservations",
    element: <PrivateRoute element={<MyReservations />} />,
  },
  { path: "/*", element: <NotFoundPage /> },
];

export default routes;
