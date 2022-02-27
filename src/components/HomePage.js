import React from "react";
import Carousel from "./Home/Carousel";
import Feature from "./Home/Feature";
import Latest from "./Home/Latest";
import Trending from "./Home/Trending";
import Header from "./Navbar/Header";

function HomePage() {
  return (
    <div>
      <Header />
      <Carousel />
      <Feature />
      <Latest />
      <Trending />
    </div>
  );
}

export default HomePage;
