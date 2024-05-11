import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = (searchQuery) => {
    let apiUrl =
      "http://localhost/project_wp_react/wordpress/wp-json/wp/v2/posts?_embed";

    if (searchQuery) {
      apiUrl += `&search=${searchQuery}`;
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

  return (
    <div>
      <div className="mb-4">
        <SearchForm handleSearch={handleSearch} />
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
