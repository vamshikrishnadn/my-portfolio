import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../../client";

function Carousel() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="post"]{
        title,
        slug,
      }`
      )
      .then((data) => {
        // console.log(data);
        setVideos(data);
      })
      .catch(console.error);
  }, []);

  function renderSearchList() {
    return videos
      .filter((val) => {
        if (search === "") {
          return;
        } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
          return val;
        }
      })
      .map((search) => {
        return (
          <li
            key={search.slug.current}
            className="list-group-item text-capitalize"
            style={{ background: "#ffffff8f" }}
          >
            <Link
              to={`/single-video/${search.slug.current}`}
              style={{ textDecoration: "none" }}
            >
              {search.title}
            </Link>
          </li>
        );
      });
  }

  return (
    <div className="bg-pic">
      <div className="search-input d-block">
        <h2 className="mb-2">BECOME A PART OF OUR COMMUNITY</h2>
        <div className="position-relative">
          <input
            className="form-control input mt-4"
            placeholder="Search Here..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass "></i>
        </div>
        {search.length >= 1 ? (
          <ul className="list-group" style={{ zIndex: 100000 }}>
            {renderSearchList()}
          </ul>
        ) : null}
        <h4 className="text-white text-uppercase mt-4">Let's grow to gether</h4>
      </div>
    </div>
  );
}

export default Carousel;
