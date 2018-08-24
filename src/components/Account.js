import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import Navigation from './Navigation';
import ImageUpload from './ImageUpload'
import * as firebase from 'firebase'


const AccountPage = () =>

  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <Navigation />
        <h1>Account: {authUser.email}</h1>
        <h1>Name: {authUser.displayName}</h1>
        <p>UID: {authUser.uid}</p>
        <p>Profile Photo:</p>
        <img src={firebase.auth().currentUser.photoURL || "//style.anu.edu.au/_anu/4/images/placeholders/person.png"} alt="Uploaded images" height="200" width="200" />

        <PasswordForgetForm />
        <PasswordChangeForm />

        <div>
        <h2>Add your profile picture</h2>
        <ImageUpload  />
        </div>
      </div>
    }
  </AuthUserContext.Consumer>

 

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);