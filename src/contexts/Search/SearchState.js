import React, { useReducer } from 'react';
import axios from 'axios';
import SearchContext from './searchContext';
import SearchReducer  from './searchReducer';
import setAccessToken from '../../utils/setAccessToken';
import {
    SEARCH_ANIME,
    CLEAR_ANIME,
    SET_LOADING,
    SEARCH_ERROR,
    GET_ANIME
} from '../types';
const SearchState = (props) => {
    const initialState = {
        animeList: [],
        animeData: null,
        loading: false,
        searchComplete: false
    }

    const [state, dispatch] = useReducer(SearchReducer, initialState);

    const setLoading = () => dispatch({ type: SET_LOADING });

    const searchAnime = async (search) => {
        setLoading();

        if (localStorage.token) {
            setAccessToken(localStorage.token);
        }

        try {
            const res = await axios.get(`/v2/anime?q=${search}&limit=30`);
            dispatch({ type: SEARCH_ANIME, payload: res.data.data });
        } catch (err) {
            dispatch({ type: SEARCH_ERROR })
        }
    };

    const clearAnime = () => dispatch({ type: CLEAR_ANIME });

    const getAnime = async (id) => {
        setLoading();

        if (localStorage.token) {
            setAccessToken(localStorage.token);
        }

        try {
            const res = await axios.get(
                `/v2/anime/${id}?fields=id,title,main_picture,synopsis,mean,num_list_users,my_list_status,num_episodes`);
            dispatch({ type: GET_ANIME, payload: res.data });
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <SearchContext.Provider
        value={{
            animeList: state.animeList,
            animeData: state.animeData,
            loading: state.loading,
            searchComplete: state.searchComplete,
            setLoading,
            searchAnime,
            clearAnime,
            getAnime
        }}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchState
