import { BrowserRouter} from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import React from "react";


const Router = () => {
  // 各ページのパス設定
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path='/' element={<Home lng={navigator.language}/>} />
      <Route path='/en' element={<Home lng="en"/>} />
      <Route path='/ja' element={<Home lng="ja"/>} />
    </Routes>
  </BrowserRouter>;
};

export default Router;