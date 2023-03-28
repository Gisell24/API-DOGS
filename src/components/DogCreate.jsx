import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./Dogcreate.css";

function validate(input) {
  let errors = {};

  if (!input.name.trim()) {
    //input es mi estado local
    errors.name = "Se requiere un Nombre";
  } else if (parseInt(input.name)) {
    errors.name =
      "Name is invalid, please use at least one letter at the beginning";
  }

  if (!input.image) {
    errors.image = "Upload an image, please";
  }
  if (!input.temperaments) {
    errors.temperaments = "Select one or more temperaments, please";
  }
  if (input.heightMin < 0 || input.heightMin > 100) {
    errors.heightMin =
      "Require field, please write a valid number between 1 and 100";
  }
  if (input.heightMax < 1 || input.heightMax > 100) {
    errors.heightMax =
      "Require field, please write a valid number between 1 and 100";
  }
  if (input.heightMax < input.heightMin) {
    errors.heightMin =
      "The minimum value cannot be greater than the maximum value";
  }

  if (input.weightMin < 0 || input.weightMin > 100) {
    errors.weightMin =
      "Require field, please write a valid number between 1 and 100";
  }
  if (input.weightMax < 1 || input.weightMax > 100) {
    errors.weightMax =
      "Require field, please write a valid number between 1 and 100";
  }
  if (input.weightMax < input.weightMin) {
    errors.weightMin =
      "The minimum value cannot be greater than the maximum value";
  }

  if (input.lmin < 0 || input.lmin > 19) {
    errors.lmin = "Require field, please write a valid number between 1 and 19";
  }
  if (input.lmax < 0 || input.lmax > 19) {
    errors.lmax = "Require field, please write a valid number between 1 and 19";
  }
  if (input.lmax < 10 && input.lmax < input.lmin) {
    errors.lmin = "The minimum value cannot be greater than the maximum value";
  }
  return errors;
}

const DogCreate = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); //se usa para redirigir a alguna ruta //v de react reemplaza a useHistory//me redirige a la ruta que yo le diga
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    image: "https://placedog.net/640/480?random",
    name: "",
    heightMin: "",
    heightMax: " ",
    weightMin: "",
    weightMax: "",
    weight: "",
    lmin: "",
    lmax: "",
    temperaments: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    if (
      !Object.keys(errors).length &&
      input.name &&
      input.image &&
      input.heightMin &&
      input.heightMax &&
      input.weightMin &&
      input.weightMax &&
      input.lmin &&
      input.lmax &&
      input.temperaments
    ) {
      input.heightMax += " cm";
      input.weightMax += " kgs";
      input.life_span = input.lmin + " - " + input.lmax + " years";
      dispatch(postDog(input));
      alert("Dog created 🐶");
      setInput({
        image: "https://placedog.net/640/480?random",
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        weight: "",
        lmin: "",
        lmax: "",
        temperaments: [],
      });
    } else {
      alert("ERROR: Dog not created 😕");
      return;
    }
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleDelete(el) {
    setInput({
      ...input, //me traigo el anterior para no pisarlo
      temperaments: input.temperaments.filter((temp) => temp !== el),
    });
  }

  return (
    <div>
      <Link as={Link} to="/home">
        <button>HOME</button>
      </Link>
      <h1 className="titulo">BE CREATIVE 🐾</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="contenedor">
          <div className="name">
            <input
              className="input-nombre"
              placeholder="Dog Name"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <input
              className="imagen"
              placeholder="Image"
              type="img"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
              alt="not found"
            ></input>
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <div>
            <input
              className="min-height"
              placeholder="Min height"
              type="number"
              value={input.heightMin}
              name="heightMin"
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.heightMin && <p className="error">{errors.heightMin}</p>}
          </div>
          <div>
            <input
              className="max-height"
              placeholder="Max height"
              type="number"
              value={input.heightMax}
              name="heightMax"
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.heightMax && <p className="error">{errors.heightMax}</p>}
          </div>
          <div>
            <input
              className="wei-min"
              placeholder="Min weight"
              type="number"
              value={input.weightMin}
              name="weightMin"
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.weightMin && <p className="error">{errors.weightMin}</p>}
          </div>
          <div>
            <input
              className="max-wei"
              placeholder="Max weight"
              type="number"
              value={input.weightMax}
              name="weightMax"
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.weightMax && <p className="error">{errors.weightMax}</p>}
          </div>
          <div>
            <input
              className="input-años"
              placeholder="Min life years"
              type="number"
              value={input.lmin}
              name="lmin"
              onChange={(e) => handleChange(e)}
            />
            {errors.lmin && <p className="error">{errors.lmin}</p>}
          </div>
          <div>
            <input
              className="input-añosmax"
              placeholder="Max life years"
              type="number"
              value={input.lmax}
              name="lmax"
              onChange={(e) => handleChange(e)}
            />
            {errors.lmax && <p className="error">{errors.lmax}</p>}
          </div>

          <select className="tempe" onChange={(e) => handleSelect(e)}>
            {errors.temperaments && (
              <p className="error">{errors.temperaments}</p>
            )}
            {temperaments.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className="create" type="submit">
            CREATE
          </button>
        </div>
      </form>
      {input.temperaments.map((el) => (
        <ul key={el}>
          <li>
            <p className="tem">{el}</p>
            <button className="x" onClick={() => handleDelete(el)}>
              X
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default DogCreate;
