import React from "react";
import "./App.css";

import Nav from "./Components/Nav/Nav";
import Home from "./pages/Home";
// import { Route, Routes } from "react-router-dom";

// import CareCreate from "./pages/T_care/careCreate";

function App() {
  return (
    <div>
      {/* <div className="navdiv"> */}
      <Nav />
      {/* </div> */}
      <Home />
      {/* <CareCreate /> */}
    </div>
  );
}

export default App;
