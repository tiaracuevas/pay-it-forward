import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { OrgSignUpLink } from './OrgSignUp';
import "./OrgSignIn.css"


const OrgSignInPage = ({ history }) =>
  <div>
    <h1>Sign In (Organization Sign In)</h1>
    <OrgSignInForm history={history} />
    
    <OrgSignUpLink />
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

class OrgSignInForm extends Component {
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
        history.push(routes.ORG_HOME);
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
      <div className="card container organization-login">

      <h1 className="orgheader">Organization Sign In</h1>
      <p className="orgheader">Please sign in to your organization user account.</p>

      <hr/>

      <div className="card-body organization-card-body">
      <form onSubmit={this.onSubmit}>
        <input className="emailbox"
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input className="passwordbox"
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit" className="signinbtn btn btn-primary">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
      </div>
      </div>
      
    );
  }
}

export default withRouter(OrgSignInPage);

export {
  OrgSignInForm,
};