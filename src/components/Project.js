import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import SanityMuxPlayer from "sanity-mux-player";

function Project() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    sanityClient
      //   .fetch(
      //     `*[_type=="project"]{
      //   title,
      //   date,
      //   place,
      //   description,
      //   projectType,
      //   link,
      //   tags,
      //   video
      // }`
      //   )
      .fetch(
        `*[_type=="project"]{
      title,
      catVideos
    }`
      )
      .then((data) => {
        console.log(data);
        setProjectData(data);
      })
      .catch(console.error);
  }, []);

  const assetDocument = {
    ms: 8,
    query: '*[_id == "066e45f9-e2e6-4537-8b40-05f8c0f334d9"][0]',
    result: {
      _createdAt: "2018-11-30T18:27:21Z",
      _id: "066e45f9-e2e6-4537-8b40-05f8c0f334d9",
      _rev: "BthrKnbCI6kaSwDobbOlna",
      _type: "mux.videoAsset",
      _updatedAt: "2018-11-30T18:27:27Z",
      assetId: "KdUXsmAKryppWd1wPiAtNVhMIqc7cPmL",
      data: {
        aspect_ratio: "16:9",
        created_at: "1543602441",
        duration: 28.233333,
        id: "KdUXsmAKryppWd1wPiAtNVhMIqc7cPmL",
        master_access: "none",
        max_stored_frame_rate: 30,
        max_stored_resolution: "HD",
        mp4_support: "none",
        passthrough: "066e45f9-e2e6-4537-8b40-05f8c0f334d9",
        playback_ids: [
          {
            _key: "SBWYNcYW",
            id: "NZQMBbYtVa6pDebOjB8wXRNQvao3RWrv",
            policy: "public",
          },
        ],
        status: "ready",
        tracks: [
          {
            _key: "RjZaLpIx",
            duration: 28.142585,
            id: "Tcte02pHV5iGVYDUqGX5hiT5XqgB8pMym",
            max_channel_layout: "stereo",
            max_channels: 2,
            type: "audio",
          },
          {
            _key: "JATA6wIK",
            duration: 28.166,
            id: "ocguJveQvPh95zPcnuitsLLXvLYaTAMwPfgDoqFLD01Q",
            max_frame_rate: 30,
            max_height: 1080,
            max_width: 1920,
            type: "video",
          },
        ],
      },
      filename: "upload video with mux.mp4",
      playbackId: "NZQMBbYtVa6pDebOjB8wXRNQvao3RWrv",
      status: "ready",
    },
  };

  return (
    <main className="bg-green-100 min-h-screen p-12">
      <section className="container mx-auto">
        <h1 className="text-5xl flex justify-center cursive">My Projects</h1>
        <h2 className="text-lg text-gray-600 flex justify-center mb-12">
          Welcome to my projects page!
        </h2>
        <section className="grid grid-cols-2 gap-8">
          {projectData &&
            projectData.map((project, index) => (
              <article className="relative rounded-lg shadow-xl bg-white p-16">
                <h3 className="text-gray-800 text-3xl font-bold mb-2 hover:text-red-700">
                  <a href={project.link} alt={project.title} target="_blank">
                    {project.title}
                  </a>
                </h3>
                <div className="text-gray-500 text-xs space-x-4">
                  <span>
                    <strong className="font-bold">Finished on</strong>:{" "}
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                  <span>
                    <strong className="font-bold">Company</strong>:{" "}
                    {project.place}
                  </span>
                  <span>
                    <strong className="font-bold">Type</strong>:{" "}
                    {project.project}
                  </span>
                  <p className="my-6 text-lg text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    className="text-red-500 font-bold hover:underlink hover:text-red-400"
                  >
                    View The Project{" "}
                    <span role="img" arial-label="right pointer">
                      👉
                    </span>
                  </a>
                  <SanityMuxPlayer
                    assetDocument={assetDocument}
                    autoload={true}
                    autoplay={true}
                    showControls={true}
                    muted={false}
                    loop={true}
                  />
                </div>
              </article>
            ))}
        </section>
      </section>
    </main>
  );
}

export default Project;
