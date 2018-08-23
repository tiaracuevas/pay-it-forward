//import * as firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

//import Rebase from 're-base'


const config = {
    apiKey: "AIzaSyAmMN8j5mWljZjwl_olATXyJreqxOMBovs",
    authDomain: "payitforward-c2c04.firebaseapp.com",
    databaseURL: "https://payitforward-c2c04.firebaseio.com",
    projectId: "payitforward-c2c04",
    storageBucket: "payitforward-c2c04.appspot.com",
    messagingSenderId: "123914173226"
 };
 

 if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }


const auth = firebase.auth();
const db = firebase.database();



export {
  auth,
  db,
 
  
  
 
};

