import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AccessContext from '../../contexts/access/accessContext';
import { Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const Token = () => {
    const accessContext = useContext(AccessContext);

    const { getAccessToken, setVerifier, setAuthToken, hasAccess } = accessContext;

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const verifier = urlParams.get('state');

    useEffect(() => {
        setVerifier(verifier);
        setAuthToken(code);
        getAccessToken(code, verifier);
        //eslint-disable-next-line
    }, [])
    if(hasAccess){
        return (
            <Redirect to='/connect' />
        )
    } else {
        return (
            <Spinner />
        )
    }

}

export default Token
