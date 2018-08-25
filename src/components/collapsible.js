import React, { Component } from 'react';
import "./collapsible.css"


export class Collapsible extends Component {
    constructor(){
        super()
        this.state={
            collapsed: true
        }
    }

    handleCollapsible = () => {
        this.setState(
            {collapsed: !this.state.collapsed}
        )
    }


    render() {
        const collapseState = (this.state.collapsed) ? "collapse" : "collapse show"
        console.log(this.state)
        return (
            <div className="accordion" id="accordionExample">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button onClick={this.handleCollapsible}className="btn btn-link collapsed section-title" type="button" data-toggle={collapseState} data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><i class="fas fa-chevron-circle-down"></i>
                              About Us
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne" className={collapseState} aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body">
                        We are an organization created to help connect volunteers with volunteer opportunities. We want to be a simple way for volunteers and organizations to connect. With our app, you are able to both post, find, and sign up for opportunities that interest you. Connection to our communities and to each other is important and we strive to provide a simple way to facilitate that connection. 
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                            <button onClick={this.handleCollapsible} className="btn btn-link collapsed section-title" type="button" data-toggle={collapseState}  data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><i class="fas fa-chevron-circle-down"></i>
                                The Mission
                            </button>
                        </h5>
                    </div>
                    <div id="collapseTwo" className={collapseState} aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div className="card-body">
                        Our mission is simple: We want to provide a simple way for people to share volunteer opportunities that they know about and to find new ones that interest them.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                            <button onClick={this.handleCollapsible} className="btn btn-link collapsed section-title" type="button" data-toggle={collapseState} data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><i class="fas fa-chevron-circle-down"></i>
                                Frequently Asked Questions
                            </button>
                        </h5>
                    </div>
                    <div id="collapseThree" className={collapseState} aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div className="card-body">


Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin libero lacus, finibus ac leo eget, scelerisque vehicula urna. Vivamus a velit sed diam tristique tincidunt non non ligula. Pellentesque varius erat non ex eleifend sagittis. Pellentesque lacinia dolor in faucibus iaculis.

A: Nullam eu metus leo. Donec metus magna, vulputate vitae sodales vulputate, tincidunt at turpis. Sed maximus suscipit urna eget viverra. Sed vitae consequat velit. Ut vestibulum odio sagittis ipsum venenatis consectetur. Donec sed tempus est.

Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin libero lacus, finibus ac leo eget, scelerisque vehicula urna. Vivamus a velit sed diam tristique tincidunt non non ligula. Pellentesque varius erat non ex eleifend sagittis. Pellentesque lacinia dolor in faucibus iaculis.

A: Nullam eu metus leo. Donec metus magna, vulputate vitae sodales vulputate, tincidunt at turpis. Sed maximus suscipit urna eget viverra. Sed vitae consequat velit. Ut vestibulum odio sagittis ipsum venenatis consectetur. Donec sed tempus est.

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}