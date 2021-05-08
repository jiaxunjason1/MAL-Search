import React, { useReducer } from 'react';
import axios from 'axios';
import AccessContext from './accessContext';
import AccessReducer from './accessReducer';
import codeVerifier from '../../utils/codeVerifier';
import {
    GEN_VERIFIER,
    SET_AUTH_TOKEN,
    GET_ACCESS_TOKEN,
    SET_VERIFIER,
    SET_ACCESS,
    LOGOUT
} from '../types';

const AccessState = (props) => {
    const initialState = {
        hasAccess: false,
        verifier: '',
        authToken: '',
        username: ''
    }

    const [state, dispatch] = useReducer(AccessReducer, initialState);

    const genVerifier = () => {
        const newVerifier = codeVerifier();
        dispatch({ type:GEN_VERIFIER, payload: newVerifier });
    };

    const setVerifier = (ver) => {
        dispatch({ type: SET_VERIFIER, payload: ver })
    }

    const setAuthToken = token => {
        dispatch({ type: SET_AUTH_TOKEN, payload: token});
    }

    const getAccessToken = async (code, ver) => {
        const params = new URLSearchParams();
        params.append('client_id', process.env.REACT_APP_MAL_CLIENT_ID);
        params.append('client_secret', process.env.REACT_APP_MAL_CLIENT_SECRET);
        params.append('code', code);
        params.append('code_verifier', ver);
        params.append('grant_type', 'authorization_code');

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        try {
            const res = await axios.post('/mal/token', params, config);
            dispatch({ type: GET_ACCESS_TOKEN, payload: res.data });
        } catch (err) {
            console.log('error getting');
        }
    }

    const setAccess = (name) => {
        dispatch({ type: SET_ACCESS, payload: name });
    }

    const logout = () => {
        dispatch({ type: LOGOUT })
    }

    return (
        <AccessContext.Provider
        value={{
            hasAccess: state.hasAccess,
            verifier: state.verifier,
            authToken: state.authToken,
            username: state.username,
            genVerifier,
            getAccessToken,
            setVerifier,
            setAuthToken,
            setAccess,
            logout
        }}>
            {props.children}
        </AccessContext.Provider>
    )
}

export default AccessState;
