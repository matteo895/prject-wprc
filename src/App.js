import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa le funzionalità di navigazione
import PostList from "./components/PostList"; // Importa il componente PostList
import PostDetail from "./components/PostDetail"; // Importa il componente PostDetail
import "bootstrap/dist/css/bootstrap.min.css"; // Importa il foglio di stile di Bootstrap
import "./App.css"; // Importa il foglio di stile personalizzato

const App = () => {
  return (
    <Router>
      {" "}
      {/* Router è il componente principale per gestire le route */}
      <div className="container">
        {" "}
        {/* Contenitore principale dell'applicazione */}
        {/* Intestazione dell'applicazione */}
        <h1 className="mt-5 mb-4 text-center title">
          APPLICAZIONE REACT CON WORDPRESS API
        </h1>
        <div className="row">
          {" "}
          {/* Riga per allineare il contenuto */}
          <div className="col-12">
            {" "}
            {/* Colonna principale */}
            {/* Definizione delle route */}
            <Routes>
              {/* Route per il componente PostList */}
              <Route exact path="/" element={<PostList />} />
              {/* Route per il componente PostDetail con un parametro postId */}
              <Route path="/post/:postId" element={<PostDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App; // Esporta il componente App
