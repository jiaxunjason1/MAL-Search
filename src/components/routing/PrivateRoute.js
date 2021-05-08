import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AccessContext from '../../contexts/access/accessContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const accessContext = useContext(AccessContext);

    const { hasAccess } = accessContext;

    return (
        <Route {...rest} render={props => !hasAccess ? (
            <Redirect to='/connect' />
        ) : (
            <Component {...props} />
        )} />
    )
}

export default PrivateRoute
