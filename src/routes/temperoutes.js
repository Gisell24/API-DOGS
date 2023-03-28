const axios = require("axios");
const { Router } = require("express");
const { routes } = require("../app");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

const routes = Router();

const getAllTemperaments = async (req, res) => {
  const temperamentsApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?key=${API_KEY}`
  );
  const temperaments = temperamentsApi.data.map((el) => el.temperament);

  //uno cadenas y separo por comas
  let dataTemperament = temperaments.join().split(",");
  //elimino espacios en blanco a c/lado
  dataTemperament = dataTemperament.map((el) => el.trim());

  //agrego los tempaeramentos a la base de datos
  dataTemperament.forEach((el) => {
    if (el !== "") {
      Temperament.findOrCreate({
        where: { name: el },
      });
    }
  });

  const allTemperaments = await Temperament.findAll();
  res.status(200).json(allTemperaments);
};

routes.get("/", getAllTemperaments);

module.exports = routes;
