import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResponseHandler from "./ResponseHandler";
import UserList from "./UserList";
import BackButton from "./BackButton";

const PostDetail = () => {
  // Ottiene l'ID del post dalla URL
  const { postId } = useParams();
  // Stato per il post
  const [post, setPost] = useState(null);

  // Effetto per recuperare il post corrispondente all'ID
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

  // Se il post non è stato caricato, mostra "Loading..."
  if (!post) {
    return <div>Loading...</div>;
  }

  // Renderizza il componente
  return (
    <div className="cardt">
      <div className="block text-center">
        {/* Titolo del post */}
        <h2 className=" decoration4 mt-3 mb-3">{post.title.rendered}</h2>
        {/* Contenuto del post */}
        <div
          className="decoration6"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></div>
        {/* Autore e data di pubblicazione */}
        <p className="decoration5 mt-5">
          AUTORE: {post._embedded.author[0].name}
        </p>
        <p className="decoration5">
          DATA DI PUBBLICAZIONE: {new Date(post.date).toLocaleString()}
        </p>
        {/* Lista utenti e handler delle risposte */}
        <div className="cardt2 d-flex justify-content-between ">
          <UserList />
          <ResponseHandler />
        </div>
        {/* Pulsante "Indietro" */}
        <BackButton />
      </div>
    </div>
  );
};

export default PostDetail;
