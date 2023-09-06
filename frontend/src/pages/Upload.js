import React, { useEffect, useState } from "react";
import axios from "axios";

function Upload() {
  const [image, setImage] = useState();
  const [caption, setCaption] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);
    axios.post("http://localhost:4000/post/upload", formData, {
      withCredentials: true,
    });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/auth", { withCredentials: true });
  }, []);

  return (
    <main>
      <form encType="multipart/form-data" onSubmit={handlePost}>
        <label htmlFor="caption">Caption:</label>
        <br />
        <textarea
          id="caption"
          name="caption"
          onChange={(e) => setCaption(e.target.value)}
        />
        <br />
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}

export default Upload;
