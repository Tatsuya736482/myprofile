import { BrowserRouter} from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import React from "react";


const Router = () => {
  // 各ページのパス設定
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/author' element={<Home />} />
      <Route path='/report' element={<Home />} />
    </Routes>
  </BrowserRouter>;
};

export default Router;