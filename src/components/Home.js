import React from "react";
import image from "../logo.svg";

function Home() {
  return (
    <main>
      <img
        src={image}
        alt="react-logo"
        className="absolute object-cover w-full h-full"
      />
      <section className="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
        <h1 className="text-6xl text-green-100 font-bold leading-none lg:leading-sung home-name">
          Aloha. I'm Kapehe
        </h1>
      </section>
    </main>
  );
}

export default Home;
