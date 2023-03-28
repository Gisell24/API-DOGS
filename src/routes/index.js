const { Router } = require("express");
// const usersRouter = require("./usersRouter");
// const postsRouter = require("./postsRouter");
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
// const { Dog } = require("../models/Dog");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op } = require("sequelize");
const routes = Router();

// Configurar los routers
// Ejemplo: router.use("/auth", authRouter);

// aca vamos a definir las rutas

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      id: el.id,
      image: el.image.url,
      name: el.name,
      height: el.height.metric.concat(" cm"), //altura
      weight: el.weight.metric.concat(" kgs"), //peso
      life_span: el.life_span, //años de vida
      temperaments: el.temperament?.split(",").map((t) => ({ name: t })),
    };
  });
  return apiInfo;
};

//esta funcion me va a traer informacion de la base de datos
const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      //decimos incluime el modelo de temperament y de este modelo traeme este atributo name
      model: Temperament,
      attributes: ["name"],
      through: {
        //el through me dice mendiante los atributos
        attributes: [],
      },
    },
  });
};

//funcion de traeme todos los dog
const getAllDogs = async () => {
  const apiInfo = await getApiInfo();

  const dbInfo = await getDbInfo();

  //concatenamos las dos constantes
  const infoTotal = apiInfo.concat(dbInfo);
  // me devuelve un arreglo con toda la info
  return infoTotal;
};

routes.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const allDogs = await getAllDogs();
  if (id) {
    let dogId = await allDogs.filter((dog) => dog.id == id);
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("dog dont exists 😕");
  }
});

routes.get("/dogs", async (req, res) => {
  const name = req.query.name;

  let dogsTotal = await getAllDogs();

  if (name) {
    //fijate si esta el name que te pasaron por query
    //que pasa si el nombre empieza con mayuscula y el nombre que tengo en la base de datos es en minuscula lo hacemos en toLowerCase
    let dogName = await dogsTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    ); //pasame el nombre que te llega por query en minuscula tambien
    dogName.length
      ? res.status(200).json(dogName)
      : res.status(404).json("No se encontro el Perro");
  } else {
    //si no hay un query
    res.status(200).send(dogsTotal);
  }
});

const createDog = async ({
  image,
  name,
  height,
  weight,
  life_span,
  origin,
  temperaments,
}) => {
  //Validacion los datos
  if (!name || !height || !weight) throw Error("Mandatory data is missing");
  //No pongo todas las prop de modelos porque los que dicen defaultvalue o allownull true no los pongo ya que se crean solas.

  //Agrego el newDog a mi base de datos, con un llamado asyn

  const count = await Temperament.count({
    where: { id: { [Op.in]: temperaments } },
  });

  if (count !== temperaments.length)
    throw new Error("Invalid ids for temperaments");

  const newDog = await Dog.create({
    image,
    name,
    height,
    weight,
    life_span,
    origin,
  });

  // console.log(temperaments);
  // console.log(newDog);

  await newDog.setTemperaments(temperaments);
  return newDog;
};

routes.post("/dogs", async (req, res) => {
  //los datos que recibo por body son los modelos
  const {
    image,
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    origin,
    temperaments,
  } = req.body;

  if (!temperaments || temperaments.length < 1)
    return res
      .status(400)
      .json({ message: "se requiere por lo menos un temperamento" });

  const height = `${heightMin} - ${heightMax}`;
  const weight = `${weightMin} - ${weightMax}`;

  try {
    const newDog = await createDog({
      image,
      name,
      height,
      weight,
      life_span,
      origin,
      temperaments,
    });

    console.log(temperaments);
    res.status(200).json(newDog);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------
routes.get("/temperaments", async (req, res) => {
  const allData = await axios.get("https://api.thedogapi.com/v1/breeds");
  try {
    let everyTemperament = allData.data
      .map((dog) => (dog.temperament ? dog.temperament : "No info"))
      .map((dog) => dog?.split(", "));
    let eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach((el) => {
      if (el) {
        Temperament.findOrCreate({
          where: { name: el },
        });
      }
    });
    eachTemperament = await Temperament.findAll();
    res.status(200).json(eachTemperament);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = routes;
