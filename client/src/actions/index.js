import axios from "axios";


export function getCountries(){
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
            const json = await axios.get(`http://localhost:3001/countries/${id}`);  
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
        const json = await axios.get(`http://localhost:3001/countries/search/${name}`);
        const data = json.data
        return dispatch({
            type: 'GET_BY_NAME',
            payload: data
        })
    }
}

export function filterContinent(order, continent) {
    return async function(dispatch) {
        const json = await axios.get(`http://localhost:3001/countries?&order=${order}&continent=${continent}`);
        return dispatch({
            type: "FILTER_CONTINENT",
            payload: json.data
        })
    }
}

export function filterNameOrder(order) {
    return async function(dispatch) {
        const json = await axios.get(`http://localhost:3001/countries?&order=${order}`);
        return dispatch({
            type: "FILTER_NAME_ORDER",
            payload: json.data
        })
    }
}


export function filterPopulation(population) {
    return async function(dispatch) {
        const json = await axios.get(`http://localhost:3001/countries?population=${population}`);
        return dispatch({
            type: "FILTER_POPULATION",
            payload: json.data
        })
    }
}

export function filterActivities(name) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/activity?name=${name}`);
            return dispatch({
                type: "FILTER_ACTIVITIES",
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
export const GET_COUNTRIES ="GET_COUNTRIES";
export const GET_DETAILS ="GET_DETAILS";
export const GET_BY_NAME ="GET_BY_NAME";
export const FILTER_CONTINENT ="FILTER_CONTINENT";
export const FILTER_NAME_ORDER ="FILTER_NAME_ORDER";
export const FILTER_POPULATION ="FILTER_POPULATION";
export const FILTER_ACTIVITIES = "FILTER_ACTIVITIES";
export const CLEAR_STATE = "CLEAR_STATE"; ///agregar en el reducer

