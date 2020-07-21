import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    NavItem,
    NavLink
} from './../../components';

// AWS
import { Auth } from 'aws-amplify';

const signOut = async () =>{
    try {
        await Auth.signOut();
        window.location.replace(`/login`);
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

const NavbarUser = (props) => (
    <NavItem { ...props }>
        <NavLink tag={ Link } onClick={()=>signOut()}>
            <i className="fa fa-power-off"></i>
        </NavLink>
    </NavItem>
);
NavbarUser.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export { NavbarUser };
