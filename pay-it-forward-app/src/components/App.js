import React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';

import OrgSignUpPage from './OrgSignUp';
import OrgSignInPage from './OrgSignIn';
import OrgAccountPage from './OrgAccount';
import OrgHomePage from './OrgHome';
import OrgLandingPage from './OrgLanding';

import PostOppPage from './PostOpp'
import ViewOppsPage from './ViewOpps' 

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

const App = () =>
  <Router>
    <div>

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />

      <Route exact path={routes.ORG_SIGN_UP} component={() => <OrgSignUpPage />} />
      <Route exact path={routes.ORG_SIGN_IN} component={() => <OrgSignInPage />} />
      <Route exact path={routes.ORG_ACCOUNT} component={() => <OrgAccountPage />} />
      <Route exact path={routes.ORG_HOME} component={() => <OrgHomePage />} />
      <Route exact path={routes.ORG_LANDING} component={() => <OrgLandingPage />} />

      <Route exact path={routes.POST_OPPS} component={() => <PostOppPage />} />
      <Route exact path={routes.VIEW_OPPS} component={() => <ViewOppsPage />} />
    </div>
  </Router>



export default withAuthentication(App);

