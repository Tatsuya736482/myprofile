import { BrowserRouter, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";

const Router = () => {
  const routingConfig = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Home",
      element: <Home lng='ja'/>,
    },
    {
      path: "/myprofile",
      element: <Home />,
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