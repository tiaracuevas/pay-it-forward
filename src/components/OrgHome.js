import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import OrgNavigation from './OrgNavigation';
import '../components/App.css';
import firebase from 'firebase/app';

class OrgHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {

      organizations: null,
      opportunities: []
    };

  }

  componentDidMount() {
    var ref = firebase.database().ref("opportunities");
    var user = firebase.auth().currentUser;
    ref.orderByChild("postedBy").equalTo(user.uid).on("value", (snapshot) => {
      let opportunities = snapshot.val();
      let newState = [];
      for (let opportunity in opportunities) {
        newState.push({
          id: opportunity,
          opportunityName: opportunities[opportunity].opportunityName,
          timeframe: opportunities[opportunity].timeframe,
          date: opportunities[opportunity].date,
          description: opportunities[opportunity].description,
          address: opportunities[opportunity].address,
          category: opportunities[opportunity].category,
          numberOfVolunteers: opportunities[opportunity].numberOfVolunteers,
        });
      }
      console.log(snapshot.val());

      this.setState({
        opportunities: newState
      });

    });
  }

  removeOpportunity(opportunityId) {
    const oppRef = firebase.database().ref(`/opportunities/${opportunityId}`);
    oppRef.remove();
  }

  render() {

    return (

      <div>
        <OrgNavigation />
        <h1>Home</h1>
        <Link to={routes.POST_OPPS}>Post Opportunities</Link>

        <p>The Org Profile Page.</p>

        <p>Hello, {firebase.auth().currentUser.displayName}</p>
        <img src={firebase.auth().currentUser.photoURL || "//style.anu.edu.au/_anu/4/images/placeholders/person.png"} alt="Uploaded images" height="200" width="200" />

        <h1>My Posted Opportunities</h1>



        <section className='display-opportunites'>
          <div className="wrapper">
            <ul>
              {this.state.opportunities.map((opportunity) => {

                return (
                  <div key={opportunity.id}>
                    <h3>{opportunity.opportunityName}</h3>
                    <p>Date: {opportunity.date}</p>
                    <p>Address: {opportunity.address}</p>
                    <p>Time: {opportunity.timeframe}</p>
                    <p>Description: {opportunity.description}</p>
                    <p>Category: {opportunity.category}</p>
                    <p>ID: {opportunity.id} </p>

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

export default withAuthorization(authCondition)(OrgHomePage);
