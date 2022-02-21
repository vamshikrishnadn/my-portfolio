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
        author,
        category,
        description,
        video{
          asset->{
            _id,
            url
          }
        },
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
      <div class="preloader">
        <img src="images/giphy.gif" class="loader" />
      </div>
    );
  }
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src="./Images/carousle1.jpg"
              alt="First slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="./Images/carousle2.jpg"
              alt="Second slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="./Images/carousle3.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>

      <h4 className="mt-4 text-center mb-3">All Videos</h4>
      <div className="container">
        <div className="row">
          {videos.map((video) => {
            return (
              <div
                key={video.video.asset._id}
                className="col-12 col-md-4  my-3"
              >
                <Link to="/single-video">
                  <video
                    src={video.video.asset.url}
                    autoPlay={true}
                    muted={true}
                    loop
                    // controls={true}
                    className="w-100"
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
