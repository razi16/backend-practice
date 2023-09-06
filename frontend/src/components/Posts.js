import React from "react";
import { Link } from "react-router-dom";

function Posts({ id, source }) {
  return (
    <Link to={id}>
      <div id={id}>
        <img width="400px" height="400px" src={source} alt={id} />
      </div>
    </Link>
  );
}

export default Posts;
