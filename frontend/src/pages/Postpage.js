import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Postpage() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    id: "",
    source: `http://localhost:4000/image/${"default.png"}`,
    caption: "text",
    like: 0,
    uploadedBy: "uploader",
  });

  const { id } = useParams();

  const handleLike = () => {
    axios
      .put(`http://localhost:4000/post/${id}/like`, null, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.isLoggedIn === false) {
          navigate("/login");
        } else {
          setPost({ ...post, like: res.data.length });
        }
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${id}`).then((res) => {
      console.log(res);
      setPost({
        id: res.data.post._id,
        source: `http://localhost:4000/image/${res.data.post.image}`,
        caption: res.data.post.caption,
        like: res.data.post.like.length,
        uploadedBy: res.data.post.uploadedBy.username,
      });
    });
  }, [id]);

  return (
    <main>
      <h1>Post Page</h1>
      <img src={post.source} alt={post.source} width="500px" height="500px" />
      <p>{post.caption}</p>
      <p>{post.uploadedBy}</p>
      <p>{post.like}</p>
      <button onClick={handleLike}>Like</button>
    </main>
  );
}

export default Postpage;
