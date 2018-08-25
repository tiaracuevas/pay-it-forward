import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';


import * as firebase from 'firebase'

import * as routes from '../constants/routes';

import { auth, db } from '../firebase';
import Navigation from './Navigation';
import "./SignUp.css";




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


        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {


                db.doCreateUser(authUser.user.uid, displayName, email)
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });
                        history.push(routes.HOME);

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
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            displayName === '';

        return (
            <div>
                <Navigation />
                <div className="parallax">
                <h2>Ready to start <br></br> paying it forward?</h2>
                <h5>Fill out the form below to join us in giving back!</h5>
                <form className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center signUpForm" onSubmit={this.onSubmit}>
                <div className="row">
                <div className="col-sm-12">
                    <input
                        value={displayName}
                        onChange={event => this.setState(byPropKey('displayName', event.target.value))}
                        type="text"
                        placeholder="Full Name"
                        className="signUpVolInput"
                    />
                </div>
                </div>
                <div className="row">
                <div className="col-sm-12">    
                    <input
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                        className="signUpVolInput"
                    />
                </div>
                </div>
                <div className="row">
                <div className="col-sm-12">    
                    <input
                        value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        type="password"
                        placeholder="Password"
                        className="signUpVolInput"
                    />
                </div>
                </div>
                <div className="row">
                <div className="col-sm-12">    
                    <input
                        value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        type="password"
                        placeholder="Confirm Password"
                        className="signUpVolInput"
                    />
                </div>
                </div>
                <div className="row">
                <div className="col-sm-12">        
                    <button disabled={isInvalid} type="submit" className="signUpButtonVol">
                        Sign Up
                </button>
                </div>
                </div>

                    {error && <p>{error.message}</p>}
                </form>
                </div>
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