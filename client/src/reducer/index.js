
import {
GET_COUNTRIES,
GET_DETAILS,
GET_BY_NAME,
FILTER_CONTINENT,
FILTER_NAME_ORDER,
FILTER_POPULATION,
FILTER_ACTIVITIES,
CLEAR_STATE,

} from '../actions';

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    details: []

}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }
        case FILTER_CONTINENT:
            return {
                ...state,
                countries: action.payload,
            }
        case FILTER_POPULATION:
            return {
                ...state,
                countries: action.payload,
            }
        case FILTER_NAME_ORDER:
            return {
                ...state,
                countries: action.payload,
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }
        case FILTER_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case CLEAR_STATE:
            return{
                ...state,
                country: {}
            }

        default: return state;
    }
}


export default rootReducer;   

