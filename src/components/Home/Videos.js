import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

const VideosSection = (props) => {
  const [videos, setVideos] = useState([]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 },
  ];

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="post"]{
        title,
        slug,
        url,
        author,
        category,
        description,
        video,
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
    <section>
      <div className="mt-4">
        <h4 className="my-2 mb-4 ml-4 mt-lg-4">{props.title}</h4>
        <div className="">
          <Carousel
            breakPoints={breakPoints}
            enableAutoPlay
            autoPlaySpeed={3000} // same time
            loop
            showArrows={false}
            showEmptySlots={true}
          >
            {videos.map((video) => {
              if (video.category === props.search) {
                return (
                  <div key={video.slug.current} className="mx-1 videoSection">
                    <Link to={`/single-video?slug=${video.slug.current}`}>
                      <video
                        src={video.url}
                        autoPlay={true}
                        muted={true}
                        loop
                        // controls={true}
                        className="latest-video"
                        className="w-100"
                        style={{ borderRadius: "10px" }}
                      ></video>
                    </Link>
                  </div>
                );
              }
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
