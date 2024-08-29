import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { Toaster } from "react-hot-toast";

export const App = () => {
  let elemet = useRoutes(routes);
  return (
    <>
      {elemet}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
