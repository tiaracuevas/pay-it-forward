import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import * as firebase from 'firebase'
import * as routes from '../constants/routes';
import { auth, db } from '../firebase';
import OrgNavigation from './OrgNavigation'


const OrgSignUpPage = ({ history }) =>
    <div>
        <OrgNavigation />
        <h1>Org SignUp</h1>
        <OrgSignUpForm history={history} />
    </div>


const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    displayName: '',

};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class OrgSignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
        this.onSubmit = this.onSubmit
        this.handleChange = this.handleChange;
    }



    onSubmit = (event) => {
        const {
            displayName,
            email,
            passwordOne,
            phoneNumber,
            missionStatement


        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {

                // Create a user in your own accessible Firebase Database too
                db.doCreateOrg(authUser.user.uid, displayName, email, phoneNumber, missionStatement)
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });
                        history.push(routes.ORG_HOME);

                    })
                    .then(firebase.auth().currentUser.updateProfile({ displayName: displayName }))
                    .catch(error => {
                        this.setState(byPropKey('error', error));
                    });


            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });



        event.preventDefault();

    }


    render() {
        const {
            displayName,
            email,
            passwordOne,
            passwordTwo,
            error,
            phoneNumber,
            missionStatement
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            displayName === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={displayName}
                    onChange={event => this.setState(byPropKey('displayName', event.target.value))}
                    type="text"
                    placeholder="Organization name"
                />
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <input
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                />

                <input
                    value={phoneNumber}
                    onChange={event => this.setState(byPropKey('phoneNumber', event.target.value))}
                    type="tel"
                    placeholder="Phone Number"
                />

                <input
                    value={missionStatement}
                    onChange={event => this.setState(byPropKey('missionStatement', event.target.value))}
                    type="text"
                    placeholder="Mission Statement"
                />

                <button disabled={isInvalid} type="submit">
                    Sign Up
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const OrgSignUpLink = () =>
    <p>
        Don't have an ORG account? Organization Sign Up
    {' '}
        <Link to={routes.ORG_SIGN_UP}>Sign Up</Link>
    </p>



export default withRouter(OrgSignUpPage);

export {
    OrgSignUpForm,
    OrgSignUpLink,
};