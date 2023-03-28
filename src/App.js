import { Route, BrowserRouter, Routes } from "react-router-dom";
import React from "react";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import "./App.css";
import DogCreate from "./components/DogCreate";
import Detail from "./components/Detail";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dog" element={<DogCreate />} />
          <Route path="/dog/:id" element={<Detail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

//el <switch envuelve cada ruta y va en ruta en ruta
