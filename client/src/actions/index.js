import axios from "axios";


export function continentFilter(order, continent) {
    return async function(dispatch) {
        const json = await axios.get(`http://localhost:3001/countries?&order=${order}&continent=${continent}`);
        return dispatch({
            type: "GET_CONTINENT",
            payload: json.data
        })
    }
}

export function nameOrder(order) {
    return async function(dispatch) {
        const json = await axios.get(`http://localhost:3001/countries?&order=${order}`);
        return dispatch({
            type: "GET_NAME_ORDER",
            payload: json.data
        })
    }
}

export function populationOrder(population) {
    return async function(dispatch) {
        const json = await axios.get(`http://localhost:3001/countries?population=${population}`);
        return dispatch({
            type: "GET_POPULATION",
            payload: json.data
        })
    }
}


export  function getCountries(){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/countries/`)
        const data = json.data
        console.log(data);
    return dispatch({
        type: 'GET_COUNTRIES',
        payload: data
        })
    }
}

export function getDetails(id) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/countries?order=${id}`);  
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch(error) {
            console.log(error)
        }
    }
}

export function getCountryByName(name){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/countries/search?order=${name}`);
        const data = json.data
        return dispatch({
            type: 'GET_BY_NAME',
            payload: data
        })
    }
}

export function getActivities(name) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/activity?order=${name}`);
            return dispatch({
                type: "GET_ACTIVITIES",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function clearState(payload){
    return{
        type: 'CLEAR_STATE',
        payload
    }
}
export const GET_CONTINENT ="GET_CONTINENT";
export const GET_POPULATION ="GET_POPULATION";
export const GET_COUNTRIES ="GET_COUNTRIES";
export const GET_DETAILS ="GET_DETAILS";
export const GET_BY_NAME ="GET_BY_NAME";
export const GET_ACTIVITIES ="GET_ACTIVITIES";
export const CLEAR_STATE = "CLEAR_STATE";
export const GET_NAME_ORDER = "GET_NAME_ORDER"; ///agregar en el reducer

