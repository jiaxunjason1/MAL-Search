import {
    GEN_VERIFIER,
    GET_ACCESS_TOKEN,
    SET_AUTH_TOKEN,
    SET_VERIFIER,
    SET_ACCESS,
    LOGOUT
} from '../types';

const accessReducer = (state, action) => {
    switch(action.type) {
        case GEN_VERIFIER:
            return {
                ...state,
                verifier: action.payload
            };
        case GET_ACCESS_TOKEN:
            console.log(action.payload.expires_in);
            console.log(action.payload.access_token);
            localStorage.setItem('token', action.payload.access_token);
            return {
                ...state,
                hasAccess: true
            };
        case SET_VERIFIER:
            return {
                ...state,
                verifier: action.payload
            };
        case SET_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload
            };
        case SET_ACCESS:
            return {
                ...state,
                hasAccess: true,
                username: action.payload
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                hasAccess: false,
                verifier: '',
                authToken: ''
            }
        default:
            return state;
    }
}

export default accessReducer
