import React, { useState, useEffect } from "react";
import sanityClient from "../../client";

const Feature = () => {
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
        console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <section>
      <div className="mt-4">
        <h2 className="text-center my-2 mb-4 mt-lg-4">Featured Videos</h2>
      </div>
    </section>
  );
};

export default Feature;
