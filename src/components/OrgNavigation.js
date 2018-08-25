import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const OrgNavigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.ORG_LANDING}>Home</Link></li>
    <li><Link to={routes.ORG_HOME}>Profile</Link></li>
    <li><Link to={routes.POST_OPPS}>Post Opportunties</Link></li>
    <li><Link to={routes.ORG_ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>


const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Home</Link></li>
    <li><Link to={routes.SIGN_IN}>Volunteer Sign In</Link></li>
    <li><Link to={routes.ORG_SIGN_IN}>Organization Sign In</Link></li>
  </ul>

export default OrgNavigation;