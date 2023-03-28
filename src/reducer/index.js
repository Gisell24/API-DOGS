import { GET_ALL_DOGS, GET_TEMPERAMENTS, ORDER_BY_NAME } from "../actions";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "GET_NAME_DOG":
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case "FILTER_BY_TEMPERAMENT":
      const copyAllDogs = state.allDogs;
      const filterTemperaments = copyAllDogs.filter((e) => {
        if (typeof e.temperaments === "string") {
          return e.temperaments.includes(action.payload);
        }
        if (Array.isArray(e.temperaments)) {
          let temp = e.temperaments.map((e) => e.name);
          return temp.includes(action.payload);
        }
      });
      return {
        ...state,
        dogs: filterTemperaments,
      };
    case "POST_DOGS":
      return {
        ...state,
      };

    case "GET_DOG_NAME":
      return {
        ...state,
        dogs: action.payload, //es el arreglo q estoy renderizando
      };
    case ORDER_BY_NAME: //'Asc. Desc'
      let sortName =
        action.payload === "Asc"
          ? state.allDogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0; // si son iguales lo deja como están quiere decir
            })
          : state.allDogs.sort(function (a, b) {
              // si no, ordenalo 'Desc'
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortName,
      };

    case "FILTER_CREATED":
      const allDogs2 = state.allDogs;
      let filteredByCreated =
        action.payload === "created"
          ? allDogs2.filter((dog) => dog.createdInDb)
          : allDogs2.filter((dog) => !dog.createdInDb);
      return {
        ...state,
        dogs: action.payload === "All" ? state.allDogs : filteredByCreated,
      };
    case "ORDER_BY_WEIGHT":
      const orderByWeight =
        action.payload === "asc"
          ? state.dogs.sort(
              (a, b) =>
                Number(a.weight.split(" - ")[0]) -
                Number(b.weight.split(" - ")[0])
            )
          : state.dogs.sort(
              (a, b) =>
                Number(b.weight.split(" - ")[0]) -
                Number(a.weight.split(" - ")[0])
            );
      return {
        ...state,
        dogs: orderByWeight,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
