const { Temperament } = require("../db");
const axios = require("axios");

async function insertTemperaments() {
  const count = await Temperament.count();

  //verifico que temperaments este vacio
  if (count === 0) {
    console.log("Cargando temperamentos...");
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const data = response.data;

    //todos los temperaments de la api
    const allTemperaments = data
      .map((item) => item.temperament?.split(", "))
      .flat();

    //elimino los undefined y creo un objeto {name: "temperament"}

    const temp = allTemperaments
      .filter(Boolean)
      .map((item) => ({ name: item }));

    try {
      //inserto los temperamentos a la db
      await Temperament.bulkCreate(temp, { ignoreDuplicates: true });
      console.log("Temperamentos cargados...");
    } catch (error) {
      console.log(`Error al cargar temperamentos: ${error.message}`);
    }
  }
}

module.exports = {
  insertTemperaments,
};
