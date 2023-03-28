import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //
import { Link } from "react-router-dom";
import "./Home.css";
import {
  getAllDogs,
  getTemperaments,
  filterDogsByTemperament,
  filterCreated,
  orderByName,
  orderByWeight,
} from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import DogCreate from "./DogCreate";

const Home = () => {
  const dispatch = useDispatch();

  //me trae del reducer el estado dogs
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  // eslint-disable-next-line no-unused-vars
  const [orden, setOrder] = useState("");

  //paginado
  const [currentPage, setCurrentPage] = useState(1); //lo seteamos en 1

  //vamos hacer otro estado local me va a indicar cuantos personajes tengo por pagina
  // eslint-disable-next-line no-unused-vars
  const [dogsPerPage, setDogsPage] = useState(8);

  //me declaro una constante que se va a llamar indice del ultimo personaje
  const indexOfLastDog = currentPage * dogsPerPage; //vale 8*1=8 posicion array
  //va ser igual a la pagina actual donde estoy * por la cantidad de personaje por pagina

  //indice del primer personaje
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; //0

  // eslint-disable-next-line no-unused-vars
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); //le decimos al slice agarra el indice del 1er dog y el indice del ultimo dog
  //los personajes que estan en la pag actual y que me guarde los personaje de cada pag

  const paginado = (pageNumber) => {
    //esta constante paginado es la que me a ayudar al renderizado
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value)); //el payload
    setCurrentPage(1); //seteo la pag actual 1
    setOrder(e.target.value); //aca se setea el ordenamiento
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setOrder(`Weight: ${e.target.value}`);
  }

  return (
    <div className="fondo">
      <Link className="create_button" to="/dog">
        Create Dog
      </Link>

      <Paginado
        dogsPerPage={dogsPerPage}
        dogs={allDogs.length}
        paginado={paginado}
      />
      <SearchBar />
      <div className="Filters-container">
        <button
          className="btn-refresh"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>

        <select
          onChange={(e) => {
            handleSort(e);
          }}
        >
          <option value="Asc">A-Z</option>
          <option value="Desc">Z-A</option>
        </select>

        <div className="Created-Filter">
          <select onChange={handleFilterCreated}>
            <option value="All">All dogs</option>
            <option value="created">Created in database</option>
            <option value="api">Existent (from API)</option>
          </select>
        </div>
        <div className="Temperaments-Filter">
          <select onChange={(e) => handleFilterTemperament(e)}>
            <option hidden>By Temperament</option>
            {allTemperaments.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="Weight-Filter">
          <select
            defaultValue={"Select"}
            onChange={(e) => {
              handleFilterByWeight(e);
            }}
          >
            <option value="Select" disabled>
              Weigth
            </option>
            <option value="asc">Light</option>
            <option value="desc">Heavy</option>
          </select>
        </div>
      </div>

      <div className="cards">
        {currentDogs?.map((el) => {
          return (
            <Card
              key={el.id}
              id={el.id}
              name={el.name}
              image={el.image}
              temperaments={el.createdInDb ? el.Temperaments : el.temperaments}
              weight={el.weight}
              height={el.height}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;

//opcion siempre vamos a necesitar que este un value

//me permite acceder y preguntar despues
//dentro de las opciones tengo value si el value es ascendente entonces hacer esto lo mismo para el desendente

// <Card
//   key={el.id}
//   id={el.id}
//   name={el.name}
//   image={el.image.url}
//   temperaments={el.temperaments}
//   weight={el.weight.metric}
//   height={el.height}
// />;
