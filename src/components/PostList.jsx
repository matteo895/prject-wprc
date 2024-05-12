import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import BackButton from "./BackButton"; // Importa il componente BackButton

const PostList = () => {
  // Stati per i post, il termine di ricerca e la visibilità del pulsante "Indietro"
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);
  const [searchMessage, setSearchMessage] = useState(""); // stato per messaggio ricerca

  // Funzione per recuperare i post in base al termine di ricerca
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

        //imposta il mess di ricerca in base alla lunghezza dei risultati
        if (data.length === 0) {
          setSearchMessage("NESSUN POST TROVATO");
        } else {
          setSearchMessage("");
        }
      })
      .catch((error) => {
        console.error("Errore nella richiesta API:", error);
      });
  };

  // Effetto per chiamare fetchPosts quando cambia il termine di ricerca
  useEffect(() => {
    fetchPosts(searchTerm);
  }, [searchTerm]);

  // Gestisce il termine di ricerca
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  // Gestisce il click sul pulsante "Indietro"
  const handleBackButtonClick = () => {
    setSearchTerm(""); // Resettare il termine di ricerca
  };

  // Renderizza il componente
  return (
    <div className="mb-5">
      <div className="mb-4">
        <SearchForm handleSearch={handleSearch} />
      </div>
      <div className="text-center mb-3">
        {showBackButton && <BackButton onClick={handleBackButtonClick} />}{" "}
        {/* Mostra il pulsante "Indietro" solo quando è necessario */}
      </div>
      <h2 className="text-center title">LISTA DEI POST</h2>
      {searchMessage && (
        <p className="text-center fs-4 bg-danger text-white mt-5 py-2">
          {searchMessage}
        </p>
      )}
      {/*mostra il messaggio di ricerca*/}
      <div className="cardt mb-5">
        <ul className="decoration3">
          {/* Mappa attraverso i post e mostra i dettagli */}
          {posts.map((post) => (
            <li key={post.id} className="block text-center ">
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
                  className="mb-4 mt-3 image"
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
