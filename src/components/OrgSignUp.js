import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import * as firebase from 'firebase'
import * as routes from '../constants/routes';
import { auth, db } from '../firebase';
import OrgNavigation from './OrgNavigation'
import "./OrgSignUp.css";


const OrgSignUpPage = ({ history }) =>
    <div>
        <OrgNavigation />
        <div className="parallax">
        <h2>Thanks for joining us!</h2>
        <h5>Sign up as an organization to start connecting with volunteers.</h5>
        <OrgSignUpForm history={history} />
        </div>
    </div>


const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    displayName: '',
    website: ''

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
            missionStatement,
            website

        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {

                // Create a user in your own accessible Firebase Database too
                db.doCreateOrg(authUser.user.uid, displayName, email, phoneNumber, missionStatement, website)
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
            missionStatement,
            website
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            displayName === '';

        return (
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <form onSubmit={this.onSubmit}>
            <div className="row">
            <div className="col-sm-12">
                <input
                    value={displayName}
                    onChange={event => this.setState(byPropKey('displayName', event.target.value))}
                    type="text"
                    placeholder="Organization name"
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
                />
            </div>   
            </div>
            <div className="row">
            <div className="col-sm-12">   
                <input
                    value={phoneNumber}
                    onChange={event => this.setState(byPropKey('phoneNumber', event.target.value))}
                    type="tel"
                    placeholder="Phone Number"
                />
            </div>   
            </div>
            <div className="row">
            <div className="col-sm-12">   
                <input
                    value={missionStatement}
                    onChange={event => this.setState(byPropKey('missionStatement', event.target.value))}
                    type="text"
                    placeholder="Mission Statement"
                />
            </div>   
            </div>
            <div className="row">
            <div className="col-sm-12">   
                <input
                    value={website}
                    onChange={event => this.setState(byPropKey('website', event.target.value))}
                    type="text"
                    placeholder="Website"
                />
            </div>   
            </div>
            <div className="row">
            <div className="col-sm-12">   
                <button disabled={isInvalid} type="submit" className="orgSignUpButton">
                    Sign Up
                </button>
            </div>
            </div>
                {error && <p>{error.message}</p>}
            </form>
         </div>   
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