import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../actions";
import "./Detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const detail = useSelector((state) => state.detail);

  const temperaments =
    detail[0] && detail[0]?.createdInDb
      ? detail[0]?.Temperaments
      : detail[0]?.temperaments;
  console.log(detail[0]);
  return (
    <div className="fondo_3">
      <div className="button_container_detail">
        <Link as={Link} to="/home">
          <button>HOME</button>
        </Link>

        {detail.length > 0 ? (
          <div>
            <h1 className="name">{detail[0].name}</h1>
            <img
              className="image_detail"
              src={detail[0].image}
              alt="not found"
            />
            <p>Height : {detail[0].height}</p>
            <p>Weight : {detail[0].weight}</p>
            <p>Life Span : {detail[0].life_span}</p>
            {temperaments?.map((t, idx) => (
              <span className="tempe" key={idx}>
                {t.name + " "}
              </span>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
//si mi personaje en 0 no tiene  la propiedad creada en la base d edatos osea le digo mi personaje es de la api entonces traeme mi dog.temperaments
