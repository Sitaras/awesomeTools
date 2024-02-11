import QRGenerator from "views/QRGenerator";
import HipsterIpsumGenerator from "views/HipsterIpsumGenerator";

const routes = [
  {
    path: "/",
    element: <QRGenerator />,
  },
  {
    path: "/qr-generator",
    element: <QRGenerator />,
  },
  {
    path: "/hipster-ipsum-generator",
    element: <HipsterIpsumGenerator />,
  },
];

export default routes;
