import React, { useState } from "react";

// Componente per gestire la risposta
const ResponseHandler = () => {
  // Stato per memorizzare la risposta
  const [response, setResponse] = useState("");

  // Funzione per gestire la risposta
  const handleResponse = () => {
    // Aggiungi qui la logica per gestire la risposta
    setResponse("Grazie per averci sostenuto !");
  };

  // Mostra l'interfaccia per gestire la risposta
  return (
    <div>
      <h2>SOSTIENICI</h2>
      {/* Bottone per gestire la risposta */}
      <button
        onClick={handleResponse}
        className="btn btn-primary mb-3 mt-3 "
        type="submit"
      >
        CLICCA QUI
      </button>
      {/* Mostra la risposta gestita */}
      <p className="decoration2 px-2 py-2 text-white">{response}</p>
    </div>
  );
};

export default ResponseHandler;
