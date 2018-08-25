import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import Navigation from './Navigation';
import "./SignIn.css"




const SignInPage = ({ history }) =>
  <div>
    <Navigation />
    <SignInForm history={history} />
    <SignUpLink />
    <PasswordForgetLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  displayName: ''
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="card container volunteer-login">

        <h1 className="volheader">Volunteer Sign In</h1>
        <p className="volheader">Please sign in to your volunteer user account.</p>
      <hr/>

      <div className="card-body volunteer-card-body">
      <form onSubmit={this.onSubmit}>
      <div className="row">
      <div className="col-sm-12">
        <input className="emailbox"
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
          className="volSignInInput"
        />
      </div>
      </div>
      <div className="row">
      <div className="col-sm-12">  
        <input className="passwordbox"
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
          className="volSignInInput"
        />
      </div>
      </div>  
        <button className="btn btn-primary" id="signinbtn" disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
      </div>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};