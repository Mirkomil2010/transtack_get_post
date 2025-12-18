import MainLayout from "@/components/ui/layouts/main-layout";
import CreateData from "@/pages/createProductService";
import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([


  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product",
        element: <CreateData />,
      },

    ],
  },
],

);

export default router;