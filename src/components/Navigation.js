import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

import "./Navigation.css"
import payItForwardNoWords from "./payItForwardNoWords.png";

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
<div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <img className= "logo" src= { payItForwardNoWords } alt="logo"/>
    <a className="navbar-brand name navigationA" href="/">Pay it Forward</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-link" id="homesignin">
        <Link to={routes.LANDING} className="navigationAHome">Home</Link>
        </li>
      </ul>
        <button type="button" className="btn navbar-btn navbtn" id="profilebtn">
        <Link to={routes.HOME} className="navigationA">Profile</Link></button>
        <button type="button" className="btn btn-primary navbar-btn navbtn account" id="accountbtn">
        <Link to={routes.ACCOUNT} className="navigationA">Account</Link></button>
        <SignOutButton className="signoutbtn"/>

    </div>
  </nav>
</div>


const NavigationNonAuth = () =>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <img className= "logo" src= { payItForwardNoWords } alt="logo"/>
    <a className="navbar-brand name" href="/">Pay it Forward</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-link" id="homesignin"><Link to={routes.LANDING} className="navigationAHome">Home</Link></li>
        <button type="button" className="btn btn-success navbar-btn navbtn" id="profilebtn"><li><Link to={routes.SIGN_IN} className="navigationA">Volunteer Sign In</Link></li></button>
        <button type="button" className="btn btn-primary navbtn"> <li><Link to={routes.ORG_SIGN_IN} className="navigationA">Organization Sign In</Link></li></button>
      </ul>
    </div>
  </nav>


export default Navigation;