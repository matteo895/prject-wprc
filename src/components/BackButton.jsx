import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <button class="btn btn-primary mb-3 " type="submit">
      {/* Utilizza il componente Link per creare un link alla pagina principale */}
      <Link to="/" className="text-white nav-link">
        Torna alla lista dei post
      </Link>
    </button>
  );
};

export default BackButton;
