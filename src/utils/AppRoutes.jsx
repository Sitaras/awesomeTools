import { useRoutes } from "react-router-dom";
import routes from "./routes";

const AppRoutes = () => {
  return useRoutes(routes);
};
export default AppRoutes;
