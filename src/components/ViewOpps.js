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
      opportunities: [],
     
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
                    photoURL: opportunities[opportunity].photoURL
                });
            }
            this.setState({
                opportunities: newState,
                
            });
        });
  
  };


    SignUpOpp(opportunityName, date, address, category, description, photoURL) {
      var user = firebase.auth().currentUser;
        firebase.database().ref('users').child(user.uid + "/myopportunities")
        .push({
          opportunityName: `${opportunityName}`,
          date: `${date}`,
          address: `${address}`,
          category: `${category}`,
          description: `${description}`,
          photoURL: `${photoURL}`,   
        })
        
        
      }
      
  

  
  render() {

    
  
    return (
        
      <div>
         
        <Navigation />
   
        
         <h1>View Opportunities</h1>
     
        
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
            <img src={opportunity.photoURL || "//style.anu.edu.au/_anu/4/images/placeholders/person.png"} height="100" width="100" />
            
            
            
            <button onClick={() => this.SignUpOpp(opportunity.opportunityName, opportunity.date, opportunity.description, opportunity.category, opportunity.address, opportunity.photoURL)}>Sign Up</button>
            
            
               
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

