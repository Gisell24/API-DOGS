//-----------------------------------------------------------------------------------<
import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const ORDER_BY_TEMPERAMENT = "ORDER_BY_TEMPERAMENT";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAR_DETAILS = "GET_DOG_DETAILS";
export const POST_DOG = "POST_DOG";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
;

export function getAllDogs() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: GET_ALL_DOGS,
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispatch({
        type: "GET_NAME_DOG",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var info = await axios("http://localhost:3001/temperaments", {});
    return dispatch({ type: "GET_TEMPERAMENTS", payload: info.data });
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/dogs", payload); //hacer la ruta del payload
    console.log(response);
    return response;
  };
}

export function filterDogsByTemperament(payload) {
  //el payload es el value q me va a llegar
  console.log(payload);
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME', //despacho con ese type
        payload
    }
}

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      if (id) {
        const detail = await axios.get(`http://localhost:3001/dogs/${id}`);
        console.log(detail);
        dispatch({
          type: "GET_DETAILS",
          payload: detail.data,
        });
      } else {
        dispatch({
          type: "GET_DETAILS",
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}




