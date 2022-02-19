import React, { useState, useEffect } from "react";
import sanityClient from "../client";

function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="author"]{
          name,
      bio,
      'authorImage':image.asset->url
    }`
      )
      .then((data) => {
        console.log(data);
        setAboutData(data);
      })
      .catch(console.error);
  }, []);

  return <div>About</div>;
}

export default About;
