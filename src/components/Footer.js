import React, { Component } from 'react';
import "./Footer.css"


export class Footer extends Component {
    render() {
        return (
            <div className="card footer">
                <div className="card-body">
                    <h5 className="card-title">Contact Us</h5>
                    <p className="card-text"><a href="mailto:webmaster@example.com">email: payitforward@gmail.com</a></p>
                    <p className="card-text">phone: 555-555-555</p>
                    <p className="card-text">Adress: 320 E 9th St, Charlotte, NC 28202</p>
                    <hr/>
                    <p className="cp">&copy;2019</p>
                </div>
            </div>
        );
    }
};