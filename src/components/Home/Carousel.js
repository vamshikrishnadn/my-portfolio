import React from "react";

function Carousel() {
  return (
    <div className="bg-pic">
      <div className="search-input d-block">
        <h2 className="mb-2">BECOME A PART OF OUR COMMUNITY</h2>
        <div className="position-relative">
          <input
            className="form-control input mt-4"
            placeholder="Search Here..."
          />
          <i className="fa-solid fa-magnifying-glass "></i>
        </div>
        <h4 className="text-white text-uppercase mt-4">Let's grow to gether</h4>
      </div>
    </div>
  );
}

export default Carousel;
