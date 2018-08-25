import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import Navigation from './Navigation';

import ImageUpload from './ImageUpload'
import * as firebase from 'firebase'

import "./Account.css";

const AccountPage = () =>

  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <Navigation />
     
        <div className="parallax">
        <h2 className="accounth2">Thanks for partnering <br></br> with us!</h2>
        <h5 className="accounth5">View and edit your account information below.</h5>
        <p className="volAccountP">Email: {authUser.email}</p>
        <p className="volAccountP">User Name: {authUser.displayName}</p>
        <p className="profileImg">Profile Photo:</p>
        <img src={firebase.auth().currentUser.photoURL || "//style.anu.edu.au/_anu/4/images/placeholders/person.png"} alt="Uploaded images" className="profileImg" height="200" width="200" />
        <div>
        <h2>Add your profile picture</h2>
        <ImageUpload  />
        </div>
        <h4 className="volAccounth4">Forgot your password? No worries. Find it here.</h4>
        <PasswordForgetForm />
        <h4 className="volAccounth4">Need to change your password? Do that right here.</h4>
        <PasswordChangeForm />
      </div>
      </div>
    }
  </AuthUserContext.Consumer>

 

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);