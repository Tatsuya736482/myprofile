import { BrowserRouter, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";

const Router = () => {
  const routingConfig = [
    {
      path: "/",
      element: <Home lng={navigator.language}/>,
    },
    {
      path: "/en",
      element: <Home lng='en'/>,
    },
    {
      path: "/ja",
      element: <Home lng='ja'/>,
    }

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