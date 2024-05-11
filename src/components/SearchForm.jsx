import React, { useState } from "react";
import BackButton from "./BackButton";

const SearchForm = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

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