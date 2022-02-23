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
    const queryParams = new URLSearchParams(window.location.search);
    sanityClient
      .fetch(
        `*[slug.current=="${queryParams.get("slug")}"]{
          video,
          title,
          author,
          category,
          description,
          url,
    }`
      )
      .then((data) => {
        console.log(data);
        setVideos(data[0]);
      })
      .catch(console.error);
  }, [slug]);

  const renderContent = () => {
    if (videos.length === 0) {
      return (
        <div class="preloader">
          <img src="./Images/giphy.gif" class="loader" />
        </div>
      );
    } else {
      return (
        <div>
          <p className="text-justify my-2">{videos.description}</p>
          <video
            src={videos.url}
            autoPlay={true}
            muted={true}
            loop
            controls={true}
            className="feature-video mt-3"
          ></video>

          <div>
            <h5>{videos.title}</h5>
          </div>
        </div>
      );
    }
  };

  return <div className="container">{renderContent()}</div>;
}

export default SingleVideo;
