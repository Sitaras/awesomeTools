import QRGenerator from "views/QRGenerator";
import HipsterIpsumGenerator from "views/HipsterIpsumGenerator";
import DiffChecker from "views/DiffChecker";

import { routesPaths } from "./routePaths";

const routes = [
  {
    path: "/",
    element: <QRGenerator />,
  },
  {
    path: routesPaths.qrGenerator,
    element: <QRGenerator />,
  },
  {
    path: routesPaths.hipsterIpsumGenerator,
    element: <HipsterIpsumGenerator />,
  },
  {
    path: routesPaths.diffChecker,
    element: <DiffChecker />,
  },
];

export default routes;
