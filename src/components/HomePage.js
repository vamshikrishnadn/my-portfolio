import React from "react";
import Carousel from "./Home/Carousel";
import Feature from "./Home/Feature";
import Latest from "./Home/Latest";
import Trending from "./Home/Trending";

function HomePage() {
  return (
    <div>
      <Carousel />
      <Feature />
      <Latest />
      <Trending />
    </div>
  );
}

export default HomePage;
