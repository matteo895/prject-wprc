import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Componente per visualizzare i dettagli di un singolo post
const PostDetail = () => {
  // Ottieni l'ID del post dalla URL
  const { postId } = useParams();

  // Stato per memorizzare il post
  const [post, setPost] = useState(null);

  // Effetto che si attiva al caricamento del componente o quando cambia l'ID del post
  useEffect(() => {
    // Effettua una chiamata all'API per ottenere il post specifico
    fetch(
      `http://localhost/project_wp_react/wordpress/wp-json/wp/v2/posts/${postId}?_embed`
    )
      .then((response) => response.json())
      .then((data) => {
        // Aggiorna lo stato con il post ottenuto
        setPost(data);
      })
      .catch((error) => {
        // Gestione degli errori
        console.error("Errore nella richiesta API:", error);
      });
  }, [postId]);

  // Se il post non è ancora stato caricato, mostra un messaggio di caricamento
  if (!post) {
    return <div>Loading...</div>;
  }

  // Visualizza i dettagli del post
  return (
    <div class="cardt">
      <div class="block text-center">
        <h2 class="fs-1">{post.title.rendered}</h2>
        {/* Mostra il contenuto del post in formato HTML */}
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
        <p>Autore: {post._embedded.author[0].name}</p>
        <p>Data di pubblicazione: {new Date(post.date).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PostDetail;
