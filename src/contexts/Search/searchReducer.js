import {
    SEARCH_ANIME,
    CLEAR_ANIME,
    SET_LOADING,
    SEARCH_ERROR,
    GET_ANIME
} from '../types';

const searchReducer = (state, action) => {
    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
                searchComplete: false
            };
        case SEARCH_ANIME:
            return {
                ...state,
                animeList: action.payload,
                loading: false,
                searchComplete: true
            };
        case SEARCH_ERROR:
            return {
                ...state,
                animeList: null,
                loading: false,
                searchComplete: true
            };
        case CLEAR_ANIME:
            return {
                animeList: [],
                loading: false,
                searchComplete: false
            };
        case GET_ANIME:
            return {
                ...state,
                animeData: action.payload,
                loading: false,
                searchComplete: true
            };
        default:
            return state;
    }
}

export default searchReducer;
