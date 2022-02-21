import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";

import sanityClient from "../../client";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function SingleVideo() {
  const [videos, setVideos] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current=="${slug}"]{
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
        setVideos(data[0]);
      })
      .catch(console.error);
  }, [slug]);

  const renderContent = () => {
    if (videos.length === 0) {
      return (
        <div class="preloader">
          <i class="fa-solid fa-spinner fa-3x"></i>
        </div>
      );
    } else {
      return (
        <div>
          <video
            src={videos.video.asset.url}
            autoPlay={true}
            muted={true}
            loop
            controls={true}
            className="feature-video mt-3"
          ></video>

          <div>
            <h5>{videos.title}</h5>
            <p className="text-justify my-2">{videos.description}</p>
          </div>
        </div>
      );
    }
  };

  return <div className="container">{renderContent()}</div>;
}

export default SingleVideo;
