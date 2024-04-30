import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Componente per visualizzare una lista di post
const PostList = () => {
  // Stato per memorizzare i post ottenuti dall'API
  const [posts, setPosts] = useState([]);

  // Effetto che si attiva al caricamento del componente
  useEffect(() => {
    // Effettua una chiamata all'API per ottenere i post
    fetch(
      "http://localhost/project_wp_react/wordpress/wp-json/wp/v2/posts?_embed"
    )
      .then((response) => response.json())
      .then((data) => {
        // Aggiorna lo stato con i post ottenuti
        setPosts(data);
      })
      .catch((error) => {
        // Gestione degli errori
        console.error("Errore nella richiesta API:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center">Lista dei Post</h2>
      <div>
        <ul>
          {/* Itera sui post e crea un elemento per ciascuno */}
          {posts.map((post) => (
            <li key={post.id}>
              <h3>
                {/* Link che porta al dettaglio del post */}
                <Link to={`/post/${post.id}`}>{post.title.rendered}</Link>
              </h3>
              {/* Mostra l'immagine di copertina se presente */}
              {post._embedded && post._embedded["wp:featuredmedia"] && (
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post._embedded["wp:featuredmedia"][0].alt_text}
                  style={{ maxWidth: "40rem", height: "auto" }}
                  className="mb-3 mt-2"
                />
              )}
              {/* Mostra l'estratto del post */}
              <p
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              ></p>
              {/* Mostra l'autore del post */}
              <p>Autore: {post._embedded.author[0].name}</p>
              {/* Mostra la data di pubblicazione formattata */}
              <p>
                Data di pubblicazione: {new Date(post.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostList;