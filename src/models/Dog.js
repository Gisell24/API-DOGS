const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Dog",
    {
      id: {
        //UUID me genera un numero ramdon que debe ser unico y especifico y nose va a repetir
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, //no te permito que este vacio este campo es requerido
        primaryKey: true, //va ser la clave primaria osea el id
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      life_span: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false } //para que no me aparezca la fecha y hora
  );
};
