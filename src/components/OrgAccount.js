import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

import OrgNavigation from './OrgNavigation';

const OrgAccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <OrgNavigation />
        <h1>Account: {authUser.email}</h1>
        <h1>Name: {authUser.displayName}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(OrgAccountPage);