import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Navbar/Header";

function Upload() {
  const [imageSelected, setImageSelected] = useState();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const uploadFile = () => {
    console.log("calling");
    setLoading(true);
    const data = new FormData();
    data.append("file", imageSelected[0]);
    data.append("upload_preset", "oxry9nqo");
    data.append("cloud_name", "djsunmihd");

    axios
      .post("https://api.cloudinary.com/v1_1/djsunmihd/video/upload", data)
      .then((response) => {
        console.log(response);
        setUrl(response.data.secure_url);
        setLoading(false);
        setAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div
        className="mt-4 align-items-center justify-content-center d-flex mx-auto w-100"
        style={{ flexDirection: "column" }}
      >
        <div class=" w-50">
          <input
            type="file"
            id="validatedCustomFile"
            onChange={(e) => {
              setImageSelected(e.target.files);
            }}
          />
        </div>
        <button
          onClick={() => {
            uploadFile();
          }}
          className="btn btn-primary my-2"
        >
          {!loading ? "Upload Video" : "Uploading..."}
        </button>

        <div className={`alert ${alert ? "alert-success" : ""}`} role="alert">
          <b>Video Url: </b>
          {url}
        </div>
      </div>
    </div>
  );
}

export default Upload;
