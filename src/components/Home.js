import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import firebase from 'firebase/app';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      opportunities: []
    };

  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    const oppsRef = firebase.database().ref("/users/" + user.uid + "/myopportunities");
    oppsRef.on('value', (snapshot) => {
      let opportunities = snapshot.val();
      let newState = [];
      for (let opportunity in opportunities) {
        newState.push({
          id: opportunity,
          opportunityName: opportunities[opportunity].opportunityName,
          date: opportunities[opportunity].date,
          timeframe: opportunities[opportunity].timeframe,
          description: opportunities[opportunity].description,
          address: opportunities[opportunity].address,
          category: opportunities[opportunity].category,

        });
      }
      this.setState({
        opportunities: newState
      });
    });


  }

  removeOpportunity(opportunityId) {
    var user = firebase.auth().currentUser;
    const oppRef = firebase.database().ref("/users/" + user.uid + "/myopportunities/" + `${opportunityId}`);
    oppRef.remove();
  }

  render() {

    return (

      <div>
        <Navigation />
        <h1>Home</h1>

        <Link to={routes.VIEW_OPPS}>All Opportunities</Link>

        <p>This is like the profile page.</p>



        <h1>My Opportunities</h1>


        <section className='display-my-opportunities'>
          <div className="wrapper">
            <ul>
              {this.state.opportunities.map((opportunity) => {
                return (
                  <div key={opportunity.id}>
                    <h3>{opportunity.opportunityName}</h3>
                    <p>Date: {opportunity.date}</p>
                    <p>Address: {opportunity.address}</p>
                    <p>Description: {opportunity.description}</p>
                    <p>Category: {opportunity.category}</p>


                    <button onClick={() => this.removeOpportunity(opportunity.id)}>Delete</button>

                  </div>
                )
              })}
            </ul>
          </div>
        </section>
      </div>

    );
  }
}




const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);

