import { BrowserRouter, useRoutes } from "react-router-dom";
import Aboutme from "./Aboutme";
import React from "react";

const Router = () => {
  const routingConfig = [
    {
      path: "/",
      element: <Aboutme />,
    },
    {
      path: "/aboutme",
      element: <Aboutme />,
    },
    {
      path: "/myprofile",
      element: <Aboutme />,
    },
    // { path: '*', element: <NotFound /> }
  ];

  const routing = useRoutes(routingConfig);

  return routing;
};

const AppRouter = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

export default AppRouter;