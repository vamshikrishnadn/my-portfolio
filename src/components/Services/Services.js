import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import { Link } from "react-router-dom";

function Services() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="post"]{
        title,
        slug,
        author,
        category,
        description,
        video,
        url
      }`
      )
      .then((data) => {
        // console.log(data);
        setVideos(data);
      })
      .catch(console.error);
  }, []);

  if (!videos) {
    return (
      <div className="preloader">
        <img src="images/giphy.gif" className="loader" />
      </div>
    );
  }
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="./Images/carousle1.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="./Images/carousle2.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="./Images/carousle3.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div className="container">
        <h4 className="mt-4 text-left ml-3 mb-3">All Videos</h4>
        <div className="row">
          {videos.map((video) => {
            return (
              <div
                key={video.video.asset._id}
                className="col-12 col-md-4  my-3"
              >
                <Link to={`/single-video/${video.slug.current}`}>
                  <video
                    src={video.url}
                    autoPlay={true}
                    muted={true}
                    loop
                    // controls={true}
                    className="w-100 h-100"
                    style={{ width: "100", borderRadius: "10px" }}
                  ></video>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Services;
