import { DashboardPage } from "./pages/DashboardPage";
import { AuthPage } from "./pages/AuthPage";
import { NotFound } from "./pages/NotFound";
import { Fields } from "./components/dashboard/Fields";
import { MyReservations } from "./components/dashboard/MyReservations";

const routes = [
    {path: "/auth", element: <AuthPage/>},
    {path: "/", element: <DashboardPage/>},
    {path: "/fields", element: <Fields/>},
    {path: "/myReservations", element: <MyReservations/>},
    {path: "/*", element: <NotFound/>}
]

export default routes;