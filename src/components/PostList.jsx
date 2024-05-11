import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import BackButton from "./BackButton"; // Importa il componente BackButton

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);

  const fetchPosts = (searchQuery) => {
    let apiUrl =
      "http://localhost/project_wp_react/wordpress/wp-json/wp/v2/posts?_embed";

    if (searchQuery) {
      apiUrl += `&search=${searchQuery}`;
      setShowBackButton(true); // Mostra il pulsante "Indietro" quando viene effettuata la ricerca
    } else {
      setShowBackButton(false); // Nascondi il pulsante "Indietro" quando si torna alla pagina principale
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Errore nella richiesta API:", error);
      });
  };

  useEffect(() => {
    fetchPosts(searchTerm);
  }, [searchTerm]);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const handleBackButtonClick = () => {
    // Logica per tornare alla pagina precedente dopo la ricerca
    setSearchTerm(""); // Resettare il termine di ricerca
  };

  return (
    <div>
      <div className="mb-4">
        <SearchForm handleSearch={handleSearch} />
      </div>
      <div className="text-center mb-3">
        {showBackButton && <BackButton onClick={handleBackButtonClick} />}{" "}
        {/* Mostra il pulsante "Indietro" solo quando è necessario */}
      </div>
      <h2 className="text-center title">LISTA DEI POST</h2>
      <div className="cardt">
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="block text-center">
              <h3>
                <Link className="decoration" to={`/post/${post.id}`}>
                  {post.title.rendered}
                </Link>
              </h3>
              {/* Mostra l'immagine in anteprima se presente */}
              {post._embedded && post._embedded["wp:featuredmedia"] && (
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post._embedded["wp:featuredmedia"][0].alt_text}
                  style={{ maxWidth: "100%", height: "auto" }}
                  className="mb-3 mt-2 image"
                />
              )}
              {/* Mostra l'anteprima del post */}
              <p
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              ></p>
              {/* Altri dettagli del post come autore, data, ecc. */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostList;
