import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';


import * as firebase from 'firebase'

import * as routes from '../constants/routes';

import { auth, db } from '../firebase';
import Navigation from './Navigation';
import ImageUpload from './ImageUpload'





const SignUpPage = ({ history }) =>
    <div>
        <h1>SignUp</h1>
        <SignUpForm history={history} />
    </div>


const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    displayName: '',
    photoURL: '',

};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class SignUpForm extends Component {
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
            photoURL


        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {


                db.doCreateUser(authUser.user.uid, displayName, email, photoURL)
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });
                        history.push(routes.HOME);
                        firebase.auth().currentUser.updateProfile({ displayName: displayName })
                        window.location.reload();

                    })
                //    .then(() => {
                //        firebase.auth().currentUser.updateProfile({ displayName: displayName })
                //        window.location.reload();
                //     })
                   
                   
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
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            displayName === '';

        return (
            <div>
                <Navigation />
                <form onSubmit={this.onSubmit}>
                    <input
                        value={displayName}
                        onChange={event => this.setState(byPropKey('displayName', event.target.value))}
                        type="text"
                        placeholder="Full Name"
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

                    

                    <button disabled={isInvalid} type="submit">
                        Sign Up
                </button>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

const SignUpLink = () =>
    <p>
        Don't have an account? (Individual User Sign Up)
    {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>



export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
};