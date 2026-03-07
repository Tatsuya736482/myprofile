import { BrowserRouter} from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Materials from "./pages/Materials";
import React from "react";


const Router = () => {
  // 各ページのパス設定
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path='/' element={<Home lng={navigator.language}/>} />
      <Route path='/en' element={<Home lng="en"/>} />
      <Route path='/ja' element={<Home lng="ja"/>} />
      <Route path='/materials' element={<Materials lng={navigator.language}/>} />
      <Route path='/en/materials' element={<Materials lng="en"/>} />
      <Route path='/ja/materials' element={<Materials lng="ja"/>} />
    </Routes>
  </BrowserRouter>;
};

export default Router;