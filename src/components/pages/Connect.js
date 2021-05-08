import React, { useContext, useEffect } from 'react';
import AccessContext from '../../contexts/access/accessContext';
import { Redirect } from 'react-router-dom';
import setAccessToken from '../../utils/setAccessToken';
import axios from 'axios';

const Connect = (props) => {
    const accessContext = useContext(AccessContext);

    const { genVerifier, setAccess, hasAccess } = accessContext;

    useEffect(() => {
        const getAccess = async () => {
            setAccessToken(localStorage.token);
            const res = await axios.get('/v2/users/@me?fields=name');
            setAccess(res.data.name);
        }
        if(localStorage.token) {
            getAccess();
        } else {
            genVerifier()
        }
        //eslint-disable-next-line
    }, []);

    if(hasAccess) {
        return (
            <Redirect to='/' />
        )
    } else {
        return (
            <div className='form-container'>
                <h1>Connect to MAL Account</h1>
                <a 
                    href={'https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id='+
                            process.env.REACT_APP_MAL_CLIENT_ID+'&code_challenge='+
                            accessContext.verifier+'&state='+accessContext.verifier}
                    className='btn btn-dark btn-block text-center my-1'>Connect</a>
            </div>
        )
    }
}

export default Connect
