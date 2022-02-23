import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Navbar/Header";
import Services from "./components/Services/Services";
import SingleVideo from "./components/Home/SingleVideo";
import Upload from "./components/Upload/Upload";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        {/* <Route path="/single-video/:slug" element={<SingleVideo />} /> */}
        <Route path="/single-video" element={<SingleVideo />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
