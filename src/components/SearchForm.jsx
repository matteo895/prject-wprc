import React, { useState } from "react";

const SearchForm = ({ handleSearch }) => {
  // Stato per il termine di ricerca
  const [searchTerm, setSearchTerm] = useState("");

  // Funzione per gestire la sottomissione del modulo di ricerca
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  // Renderizza il componente
  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control me-2"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
