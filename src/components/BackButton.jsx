import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ onClick }) => {
  return (
    <Link to="/">
      <button className="btn btn-primary mb-3 " type="submit" onClick={onClick}>
        {/* Utilizza il componente Link per creare un link alla pagina principale */}
        Torna alla lista dei post
      </button>
    </Link>
  );
};

export default BackButton;
