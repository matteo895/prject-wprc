import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResponseHandler from "./ResponseHandler";
import UserList from "./UserList";
import BackButton from "./BackButton";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost/project_wp_react/wordpress/wp-json/wp/v2/posts/${postId}?_embed`
    )
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error("Errore nella richiesta API:", error);
      });
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cardt">
      <div className="block text-center">
        <h2 className=" decoration4 mt-3 mb-3">{post.title.rendered}</h2>
        <div
          className="decoration6"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></div>
        <p className="decoration5 mt-5">
          AUTORE: {post._embedded.author[0].name}
        </p>
        <p className="decoration5">
          DATA DI PUBBLICAZIONE: {new Date(post.date).toLocaleString()}
        </p>
        <div className="cardt2 d-flex justify-content-between ">
          <UserList />
          <ResponseHandler />
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default PostDetail;
