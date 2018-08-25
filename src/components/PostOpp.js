import React, { Component } from 'react';
import OrgNavigation from './OrgNavigation';
import {
    //Link,
    withRouter,
} from 'react-router-dom';

import * as firebase from 'firebase'

import * as routes from '../constants/routes';

import { db } from '../firebase';
import './PostOpps.css';



const PostOppPage = ({ history }) =>
    <div>
        <OrgNavigation />
        <div className="parallax">
        <h2>Need volunteers? <br></br> We've got you covered.</h2>
        <h5>Post your organization's opportunities below.</h5>
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


        } = this.state;

        const {
            history,
        } = this.props;
        var user = firebase.auth().currentUser;
        db.postOpp(id, opportunityName, date, numberOfVolunteers, timeframe, address, description, category, user.uid)
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
            <div>

                <div className="container">
                    <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-sm-12">
                        <div className="form-group">
                            <input
                                value={opportunityName}
                                onChange={event => this.setState(byPropKey('opportunityName', event.target.value))}
                                type="text"
                                placeholder="Opportunity name"
                            />
                        </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-4">
                        <div className="form-group">
                            <input
                                value={date}
                                onChange={event => this.setState(byPropKey('date', event.target.value))}
                                type="date"
                                placeholder="Date"
                            />
                        </div>
                        </div>

                        <div className="col-sm-4">
                        <div className="form-group">
                            <input
                                value={timeframe}
                                onChange={event => this.setState(byPropKey('timeframe', event.target.value))}
                                type="text"
                                placeholder="Time"
                            />
                        </div>
                        </div>
                        
                        <div className="col-sm-4">
                        <div className="form-group">
                            <input
                                value={numberOfVolunteers}
                                onChange={event => this.setState(byPropKey('numberOfVolunteers', event.target.value))}
                                type="text"
                                placeholder="Number of volunteers"
                            />
                        </div>
                        </div>
                        </div>

                        <div class="row">
                        <div class="col-sm-12">
                        <div className="form-group">
                            <input
                                value={address}
                                onChange={event => this.setState(byPropKey('address', event.target.value))}
                                type="text"
                                placeholder="Address"
                            />
                        </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-12">
                        <div className="form-group">
                            <input
                                value={description}
                                onChange={event => this.setState(byPropKey('description', event.target.value))}
                                type="text"
                                placeholder="Event description"
                            />
                        </div>
                        </div>
                        </div>
                        <div className="form-group">
                            Category:
                <select value={category} onChange={event => this.setState(byPropKey('category', event.target.value))}>
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
                        <div className="form-group">
                            <button disabled={isInvalid} type="submit" className="postOppButton">
                                Add Opportunity
                </button>
                        </div>

                        {error && <p>{error.message}</p>}
                    </form>
                </div>
            </div>
        );
    }
}




export default withRouter(PostOppPage);

export {
    PostOppPage
};