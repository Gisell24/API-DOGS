import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const LandingPage = () => {
  return (
    <div>
      <h1 className="titulo">Bienvenidos a Proyecto de Dogs</h1>
      <Link to="/home">
        <button className="ingresar">Ingresar</button>
      </Link>
    </div>
  );
};

export default LandingPage;
