import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

import OrgNavigation from './OrgNavigation';
import ImageUpload from './ImageUpload'
import * as firebase from 'firebase'
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
       <p>Profile Photo:</p>
        <img src={firebase.auth().currentUser.photoURL || "//style.anu.edu.au/_anu/4/images/placeholders/person.png"} alt="Uploaded images" height="200" width="200" />
        <h4 className="orgAccounth4">Forgot your password? No worries. Find it here.</h4>
        <PasswordForgetForm />
        <h4 className="orgAccounth4">Need to change your password? Do that right here.</h4>
        <PasswordChangeForm />
        <div>
        <h2>Add your Logo</h2>
        <ImageUpload />
        </div>
      </div>
     </div> 
    }
  </AuthUserContext.Consumer>





const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(OrgAccountPage);