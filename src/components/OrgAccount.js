import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

import OrgNavigation from './OrgNavigation';
import "./OrgAccount.css";


const OrgAccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <OrgNavigation />
        <div className="parallax">
        <h2 className="orgAccounth2">Thanks for partnering <br></br> with us!</h2>
        <h5 className="orgAccounth5">View and edit your account information below.</h5>
        <p className="orgAccountP">Email: {authUser.email}</p>
        <p className="orgAccountP">Organization: {authUser.displayName}</p>
        <h4 className="orgAccounth4">Forgot your password? No worries. Find it here.</h4>
        <PasswordForgetForm />
        <h4 className="orgAccounth4">Need to change your password? Do that right here.</h4>
        <PasswordChangeForm />
        </div>
      </div>
    }
  </AuthUserContext.Consumer>


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(OrgAccountPage);