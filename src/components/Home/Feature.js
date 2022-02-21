import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import Carousel from "react-elastic-carousel";

const Feature = () => {
  const [videos, setVideos] = useState([]);

  // const breakPoints = [
  //   { width: 1, itemsToShow: 1 },
  //   { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  //   { width: 768, itemsToShow: 4 },
  //   { width: 1200, itemsToShow: 1 },
  // ];
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
        <h2 className="text-center my-2 mb-4 mt-lg-4">Featured Videos</h2>
        <Carousel
          // breakPoints={breakPoints}
          enableAutoPlay
          autoPlaySpeed={3000} // same time
          loop
          showArrows={false}
          showEmptySlots={true}
        >
          {videos.map((video) => {
            if (video.category === "feature") {
              {
                /* console.log(video.video.asset.url); */
              }
              return (
                <div key={video.video.asset._id}>
                  <video
                    src={video.video.asset.url}
                    autoPlay={true}
                    muted={true}
                    loop
                    // controls={true}
                    className="feature-video"
                  ></video>
                </div>
              );
            }
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default Feature;
