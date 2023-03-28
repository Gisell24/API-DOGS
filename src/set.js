// const { Router } = require("express");
// const { Dog, Temperament } = require("../db");
// const axios = require("axios");
// require("dotenv").config();
// const { API_KEY } = process.env;
// const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

// const router = Router();

// const getInfoAPI = async () => {
//   const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
//   const apiDogs = await apiURL.data.map((dog) => {
//     return {
//       id: dog.id,
//       image: dog.image.url,
//       name: dog.name,
//       temperament: dog.temperament,
//       weight: dog.weight,
//       origin: dog.origin,
//       temperamentCC: dog.temperament,
//     };
//   });

//   return apiDogs;
// };

// const datainDB = async () => {
//   let DogDB = await Dog.findAll({
//     include: {
//       model: Temperament,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });

//   const tempDB = DogDB.map((dog) => {
//     return {
//       id: dog.id,
//       image: dog.img,
//       name: dog.name,
//       temperament: dog.temperaments.map((temper) => temper.name).join(", "),
//       life_span: dog.life_span,
//       weight: dog.weight,
//       origin: dog.origin,
//       temperamentCC: dog.temperament,
//       created: true,
//     };
//   });

//   return tempDB;
// };

// const getAllDogs = async () => {
//   const apiInfo = await getInfoAPI();
//   const dataInfo = await datainDB();
//   const infoTotal = apiInfo.concat(dataInfo);
//   return infoTotal;
// };

// const { Temperament } = require("./db");
// const axios = require("axios");

// async function insertTemperaments() {
//   const count = await Temperament.count();

//   //verifico que temperaments este vacio
//   if (count === 0) {
//     console.log("Cargando temperamentos...");
//     const response = await axios.get("https://api.thedogapi.com/v1/breeds");
//     const data = response.data;

//     //todos los temperaments de la api
//     const allTemperaments = data
//       .map((item) => item.temperament?.split(", "))
//       .flat();

//     //elimino los undefined y creo un objeto {name: "temperament"}

//     const temp = allTemperaments
//       .filter(Boolean)
//       .map((item) => ({ name: item }));

//     try {
//       //inserto los temperamentos a la db
//       await Temperament.bulkCreate(temp, { ignoreDuplicates: true });
//       console.log("Temperamentos cargados...");
//     } catch (error) {
//       console.log(`Error al cargar temperamentos: ${error.message}`);
//     }
//   }
// }

// module.exports = {
//   insertTemperaments,
// };
