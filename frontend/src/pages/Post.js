import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Posts from "../components/Posts";

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/post").then((res) => {
      console.log(res);
      setPosts(res.data.posts);
    });
  }, []);

  return (
    <main>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Posts
          key={post._id}
          id={post._id}
          source={`http://localhost:4000/image/${post.image}`}
        />
      ))}
      <Link to="upload">Upload a post</Link>
    </main>
  );
}

export default Post;
