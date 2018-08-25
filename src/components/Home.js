import React, { Component } from "react";

import withAuthorization from "./withAuthorization";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import firebase from "firebase/app";

import "./Home.css";

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
    const oppsRef = firebase
      .database()
      .ref("/users/" + user.uid + "/myopportunities");
    oppsRef.on("value", snapshot => {
      let opportunities = snapshot.val();
      let newState = [];
      for (let opportunity in opportunities) {
        newState.push({
          id: opportunity,
          opportunityName: opportunities[opportunity].opportunityName,
          date: opportunities[opportunity].date,
          description: opportunities[opportunity].description,
          address: opportunities[opportunity].address,
          category: opportunities[opportunity].category
        });
      }
      this.setState({
        opportunities: newState
      });
    });
  }

  removeOpportunity(opportunityId) {
    var user = firebase.auth().currentUser;
    const oppRef = firebase
      .database()
      .ref("/users/" + user.uid + "/myopportunities/" + `${opportunityId}`);
    oppRef.remove();
  }

  render() {
    return (
      <div>
        <Navigation />

        <div class="container">
          <div class="centered text-center">
            <h1>Home</h1>
            <div class="card ">
              <div class="card-header">
                <ul
                  class="nav nav-tabs card-header-tabs pull-right"
                  id="myTab"
                  role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="AllOpportunities-tab"
                      data-toggle="tab"
                      href="#AllOpportunities"
                      role="tab"
                      aria-controls="AllOpportunities"
                      aria-selected="false">
                      <Link to={routes.VIEW_OPPS}>All Opportunities</Link>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="MyOpportunities-tab"
                      data-toggle="tab"
                      href="#MyOpportunities"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="true">
                      My Opportunities
                    </a>
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="MyOpportunities"
                    role="tabpanel"
                    aria-labelledby="MyOpportunities-tab">
                  </div>

                  <section className="display-my-opportunities">
                    <div className="wrapper">
                      <ul>
                        {this.state.opportunities.map(opportunity => {
                          return (
                            <div className="container">
                              <div key={opportunity.id}>
                              <div className="row">
                              <h3 className="col-md-2">{opportunity.opportunityName}</h3>
                              <p className="myopps col-md-2">Date: {opportunity.date}</p>
                              <p className="myopps col-md-2">Address: {opportunity.address}</p>
                              <p className="myopps col-md-2">Description: {opportunity.description}</p>
                              <p className="myopps col-md-2">Category: {opportunity.category}</p>

                              <button className="btn btn-primary delete-btn"
                                onClick={() =>
                                  this.removeOpportunity(opportunity.id)}>Delete
                              </button>
                            </div>
                            </div>
                            </div> //closing row
                          );
                        })}
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* <section className='display-my-opportunities'>
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
          </section> */}
          </div>
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
