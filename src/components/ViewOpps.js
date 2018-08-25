import React, { Component } from 'react';
//import React from 'react';
import withAuthorization from './withAuthorization';

import "./ViewOpps.css";

import Navigation from './Navigation';
import '../components/App.css';
import './ViewOpps.css'

import firebase from 'firebase/app';
import 'firebase/database'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';


class ViewOppsPage extends React.Component {
    
  constructor(props) {
    super(props);

    this.state = {
      opportunities: []
    };



    
  }



  componentDidMount() {
      const oppsRef = firebase.database().ref('opportunities');
        oppsRef.on('value', (snapshot) => {
            let opportunities = snapshot.val();
            let newState = [];
            for (let opportunity in opportunities){
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
            this.setState({
                opportunities: newState
            });
        });
  
  };


    SignUpOpp(opportunityName, date, address, category, description) {
      var user = firebase.auth().currentUser;
        firebase.database().ref('users').child(user.uid + "/myopportunities")
        .push({
          opportunityName: `${opportunityName}`,
          date: `${date}`,
          address: `${address}`,
          category: `${category}`,
          description: `${description}`,   
        })
        
      }
      
  

  
  render() {
  
    return (
        
      <div>
         
        <Navigation />
   
      <div className="parallax">
         <h2>Go ahead and find your <br></br> way to give back!</h2>
         <h5>Just click the sign up button and get volunteering.</h5>

        
         <section className='display-opportunites'>
            <div className="wrapper">
             <ul>
            {this.state.opportunities.map((opportunity) => {
        return (

    <div className="opportunities pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"> 
        <div className="container">
          <div key={opportunity.id}>
            <div className="row">
              <div className="col-sm-12">
                <div className="opportunityName">{opportunity.opportunityName}</div>
                <div className="opportunityCategory" >{opportunity.category}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="opportunityBox">
                <p className="opportunityDate"><FontAwesomeIcon  className="icon" icon={faCalendarAlt} />{opportunity.date}</p>
                <p className="opportunityAddress"><FontAwesomeIcon  className="icon" icon={faClock} />{opportunity.address}</p>
                <p className="opportunityTime"><FontAwesomeIcon  className="icon" icon={faMapMarkerAlt} />{opportunity.timeframe}</p>
              </div>
              </div>
            </div>
            <div className="row">
            <div className="col-sm-12">
            <p>{opportunity.description}</p>
            </div>
            </div>
           {/*} <p>ID: {opportunity.id} </p>*/}
            <button className="opportunitySignupButton" onClick={() => this.SignUpOpp(opportunity.opportunityName, opportunity.date, opportunity.description, opportunity.category, opportunity.address)}>Sign Up</button>
          </div>
        </div>
      </div>
        )
      })}
    </ul>
  </div>
</section>

      </div>
</div>      
    
      
    );
  }
}



const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ViewOppsPage);

