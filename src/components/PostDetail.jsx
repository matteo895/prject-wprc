import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
        <h2 className="fs-1">{post.title.rendered}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
        <p>Autore: {post._embedded.author[0].name}</p>
        <p>Data di pubblicazione: {new Date(post.date).toLocaleString()}</p>
        <UserList />
        <ResponseHandler />
        <BackButton />
      </div>
    </div>
  );
};

export default PostDetail;
