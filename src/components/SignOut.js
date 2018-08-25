import React from 'react';

import { auth } from '../firebase';

const SignOutButton = () =>
  <button
    type="button"
    onClick={auth.doSignOut}
    className="btn btn-warning navbar-btn"
  >
    Sign Out
  </button>

export default SignOutButton;