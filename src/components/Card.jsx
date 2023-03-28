import React from "react";
import { Link } from "react-router-dom";
// import style from "./Card.module.css";
import "./Card.css";

const Card = ({ image, name, temperaments, weight, id }) => {
  console.log(temperaments);
  return (
    <div className="fondo">
      <div className="container">
        <Link to={"/dog/" + id}>
          <img
            className="card_image"
            src={image}
            alt="img not found"
            width="200px"
            height="250px"
          />
        </Link>

        <h3>{name}</h3>
        <h5 className="temp">
          {temperaments?.map((t) => (
            <span>{t.name + " "} </span>
          ))}
        </h5>
        <h5>{weight}</h5>
      </div>
    </div>
  );
};

export default Card;

//  <h3>{temperaments.map((temp) => `${temp.name}`).join(", ")}</h3>;

{
  /* <div>
  <img src={image} alt="img not found" width="200px" height="250px" />
  <h3>{name}</h3>
  <h3>{weight + " kilos"}</h3>

  <h5>{temperaments}</h5>
</div>; */
}
