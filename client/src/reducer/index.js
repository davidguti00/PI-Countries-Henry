
import {
GET_CONTINENT,
GET_POPULATION,
GET_COUNTRIES,
GET_DETAILS,
GET_BY_NAME,
GET_ACTIVITIES,
CLEAR_STATE,

} from '../actions';

const initialState = {
    Continent: [],
    allCountries: [],
    activities: [],
    country: []

}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
            }
        case GET_CONTINENT:
            return {
            ...state,
            allCountries: action.payload,
            }
        case GET_POPULATION:
            return {
            ...state,
            allCountries: action.payload,
            }
        case GET_DETAILS:
            return {
                ...state,
                country: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activity: action.payload
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

