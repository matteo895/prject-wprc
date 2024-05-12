import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 className="mt-5 mb-4 text-center title">
          APPLICAZIONE REACT CON WORDPRESS API
        </h1>
        <div className="row">
          <div className="col-12">
            <Routes>
              <Route exact path="/" element={<PostList />} />
              <Route path="/post/:postId" element={<PostDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
