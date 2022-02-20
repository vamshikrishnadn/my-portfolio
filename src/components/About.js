import React, { useState, useEffect } from "react";
import sanityClient from "../client";

import SanityMuxPlayer from "sanity-mux-player";

import MuxVideo from "@mux-elements/mux-video-react";

function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="videoBlogPost"]{
        title,
        Files{
          asset->{
            _id,
            url
          }
        },
      }`
      )
      .then((data) => {
        console.log(data);
        setAboutData(data.video);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      {/* <SanityMuxPlayer
        assetDocument={assetDocument}
        autoload={true}
        autoplay={true}
        showControls={true}
        muted={false}
        loop={true}
      /> */}

      <video
        src="https://cdn.sanity.io/files/wde1vlb7/production/bfe8feaec39f112dfcc53bbc98a1c17309e0f941.mp4"
        autoplay
        muted
        loop
      ></video>
    </div>
  );
}

export default About;
