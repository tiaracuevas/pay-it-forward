import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import Navigation from './Navigation';


const AccountPage = () =>

  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <Navigation />
        <h1>Account: {authUser.email}</h1>
        <h1>Name: {authUser.displayName}</h1>
        <p>UID: {authUser.uid}</p>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

 

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);