import React from 'react';
import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';


const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
          authUser: null,
          uid: '',
          
        };
      }
      
      componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
          if (authUser){
            console.log(authUser)
            console.log(authUser.uid)
            
            this.setState({authUser})
          }else{
             this.setState({authUser: null});
          }
        });
      }
    render() {
        const { authUser } = this.state;
       
      return (
        <AuthUserContext.Provider value={authUser}>
        <Component />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
}


export default withAuthentication