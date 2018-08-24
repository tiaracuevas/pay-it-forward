import React, { Component } from 'react';
//import React from 'react';
import withAuthorization from './withAuthorization';



import Navigation from './Navigation';
import '../components/App.css';
import './ViewOpps.css'

import firebase from 'firebase/app';
import 'firebase/database'

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
   
        
         <h1>Go ahead and find your way to give back!</h1>
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
                <h3>{opportunity.opportunityName}</h3>
                <p>{opportunity.category}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <p>Date: {opportunity.date}</p>
            </div>
            <div className="col-sm-4">
            <p>Address: {opportunity.address}</p>
            </div>
            <div className="col-sm-4">
            <p>Time: {opportunity.timeframe}</p>
            </div>
            </div>
            <div className="row">
            <div className="col-sm-12">
            <p>Description: {opportunity.description}</p>
            </div>
            </div>
           {/*} <p>ID: {opportunity.id} </p>*/}
            <button onClick={() => this.SignUpOpp(opportunity.opportunityName, opportunity.date, opportunity.description, opportunity.category, opportunity.address)}>Sign Up</button>
          </div>
        </div>
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

export default withAuthorization(authCondition)(ViewOppsPage);

