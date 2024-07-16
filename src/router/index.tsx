import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import Runtime from "@/pages/Runtime";
import Layout from "@/components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "runtime",
            element: <Runtime />
          }
        ]
      }
    ]
  },
]);
