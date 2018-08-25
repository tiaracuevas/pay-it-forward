import React from 'react';
import Navigation from './Navigation';
import "./Landing.css"
import { Collapsible } from "./Collapsible";
import { Footer } from "./Footer.js";

const LandingPage = () =>
  <div>
    <Navigation />
    <div className="jumbotron">
      <h1 className="display-4">Welcome To Pay it Forward</h1>
      <hr className="my-4" />
      <h4>A place to connect volunteers with volunteer opportunties.</h4>
      {/*<a className="btn btn-success btn-lg" href="#" role="button">Get Involved!</a>*/}
    </div>
    <Collapsible />
    <Footer />
  </div>

export default LandingPage;