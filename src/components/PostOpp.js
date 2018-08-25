import React, { Component } from 'react';

import OrgNavigation from './OrgNavigation';
import {
    //Link,
    withRouter,
} from 'react-router-dom';

import * as firebase from 'firebase'

import * as routes from '../constants/routes';

import { db } from '../firebase';
import "./PostOpps.css";

const PostOppPage = ({ history }) =>
    <div>
        <OrgNavigation />
        <div className="parallax">
        <h2 className="postOppsh2">Need volunteers? <br></br> We've got you covered.</h2>
        <h5 className="postOppsh5">Post your organization's opportunities below.</h5>
        <PostOppForm history={history} />
        </div>
    </div>


const INITIAL_STATE = {
    opportunityName: '',
    date: '',
    numberOfVolunteers: '',
    timeframe: '',
    address: '',
    description: '',
    category: 'default',
    postedBy: '',
    photoURL: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class PostOppForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
        this.onSubmit = this.onSubmit
        this.handleChange = this.handleChange;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onSubmit = (event) => {
        const {
            id,
            opportunityName,
            date,
            numberOfVolunteers,
            timeframe,
            address,
            description,
            category,
            postedBy,
            photoURL


        } = this.state;

        const {
            history,
        } = this.props;
        var user = firebase.auth().currentUser;
        db.postOpp(id, opportunityName, date, numberOfVolunteers, timeframe, address, description, category, user.uid, user.photoURL)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                history.push(routes.ORG_HOME)
            })
            .catch(error => {
                this.setState(byPropKey('error', error))
            })

        event.preventDefault();

    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const {
            opportunityName,
            date,
            numberOfVolunteers,
            timeframe,
            address,
            description,
            category,
            postedBy,
            error
        } = this.state;

        const isInvalid =
            opportunityName === '' ||
            date === '' ||
            numberOfVolunteers === '' ||
            timeframe === '' ||
            address === '' ||
            description === '' ||
            category === 'default';

        return (

               <div className="container pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center postOpps">
                <form onSubmit={this.onSubmit}>
                <div className="row">
                <div className="col-sm-12">
                        <input
                            value={opportunityName}
                            onChange={event => this.setState(byPropKey('opportunityName', event.target.value))}
                            type="text"
                            placeholder="Opportunity name"
                            className="postOppsInput"
                        />     
                </div>
                </div>
                <div className="row">
                <div className="col-sm-12">         
                        <input
                            value={date}
                            onChange={event => this.setState(byPropKey('date', event.target.value))}
                            type="date"
                            placeholder="Date"
                            className="postOppsInput"
                        />
                </div>
                </div>
                <div className="row">
                <div className="col-sm-12">            
                        <input
                            value={numberOfVolunteers}
                            onChange={event => this.setState(byPropKey('numberOfVolunteers', event.target.value))}
                            type="text"
                            placeholder="Number of volunteers"
                            className="postOppsInput"
                        />
                </div>
                </div>
                <div className="row">
                <div className="col-sm-12">    
                        <input
                            value={timeframe}
                            onChange={event => this.setState(byPropKey('timeframe', event.target.value))}
                            type="text"
                            placeholder="Time"
                            className="postOppsInput"
                        />
                </div>
                </div>
                <div className="row">
                <div className="col-sm-12">    
                        <input
                            value={address}
                            onChange={event => this.setState(byPropKey('address', event.target.value))}
                            type="text"
                            placeholder="Address"
                            className="postOppsInput"
                        />
                </div>
                </div>
                <div className="row">
                <div className="col-sm-12">    
                        <input
                            value={description}
                            onChange={event => this.setState(byPropKey('description', event.target.value))}
                            type="text"
                            placeholder="Event description"
                            className="postOppsInput"
                        />
                </div>
                </div>
                <div className="row">
                <div className="col-sm-12">    
                        Category:
                        <select value={category} className="postOppsSelect" onChange={ event => this.setState(byPropKey('category', event.target.value))}>
                            <option value="default">Please select one...</option>
                            <option value="animals">Animals</option>
                            <option value="children">Children</option>
                            <option value="community">Community</option>
                            <option value="compandtech">Computers and Technology</option>
                            <option value="education">Education</option>
                            <option value="medical">Medical</option>
                            <option value="seniors">Seniors</option>
                            <option value="teens">Teens</option>
                            <option value="other">Other</option>
                        </select>
                        </div>
                </div>
                <div className="row">
                <div className="col-sm-12">    
                        <button disabled={isInvalid} type="submit" className="postOppButton">
                            Add Opportunity
                        </button>
                        </div>
                </div>         

                    {error && <p>{error.message}</p>}
                </form>
            </div>    
        );
    }
}




export default withRouter(PostOppPage);

export {
    PostOppPage
};