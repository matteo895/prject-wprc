import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail"; // Aggiunto il componente PostDetail
import UserList from "./components/UserList";
import ResponseHandler from "./components/ResponseHandler";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BackButton from "./components/BackButton";

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 className="mt-4 mb-4 text-center">
          Applicazione React con WordPress API
        </h1>
        <div className="row">
          <div className="col-12">
            <Routes>
              <Route exact path="/" element={<PostList />} />
              <Route path="/post/:postId" element={<PostDetail />} />{" "}
              {/* Aggiunta la rotta per PostDetail */}
            </Routes>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-6 ">
                <UserList />
              </div>
              <div className="col-6">
                <ResponseHandler />
              </div>
              <div className="col-12 ">
                <BackButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
