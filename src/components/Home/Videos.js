import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import Carousel from "react-elastic-carousel";

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
                  <div
                    key={video.video.asset._id}
                    className="mx-1 videoSection"
                  >
                    <video
                      src={video.video.asset.url}
                      autoPlay={true}
                      muted={true}
                      loop
                      // controls={true}
                      className="latest-video"
                      className="w-100"
                      style={{ borderRadius: "10px" }}
                    ></video>
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
