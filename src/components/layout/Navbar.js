import React, { Fragment, useContext } from 'react';
import icon from './icon.png';
import { Link } from 'react-router-dom';
import AccessContext from '../../contexts/access/accessContext';

const Navbar = () => {
    const accessContext = useContext(AccessContext);

    const { logout, hasAccess, username } = accessContext;

    const onLogout = () => {
        logout();
    }

    const connectedLinks = (
        <Fragment>
            <li>
                <Link to='/' >Home</Link>
            </li>
            <li>
                    <Link to='/about' >About</Link>
            </li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt' />Disconnect</a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/' >Home</Link>
            </li>
            <li>
                    <Link to='/about' >About</Link>
            </li>
        </Fragment>
    )

    return (
        <div className='navbar bg-primary'>
            <h1>
                <img src={icon} alt='' style={{width: '90'}}/>
            </h1>
            {(hasAccess && username) ? <h1>Welcome, {username}!</h1> : null}
            <ul>
                {hasAccess ? connectedLinks : guestLinks}
            </ul>
        </div>
    )
}

export default Navbar
