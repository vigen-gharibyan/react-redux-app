import React, {Component} from 'react';

import Header from './header/Header';
import {Alert} from './alert/Alert';
import Footer from './footer/Footer';
import './css/layout.css';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Layout">
                <Header />

                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Alert />
                    </div>
                </div>
                
                <div className="container">
                    {this.props.children}
                </div>

                <Footer/>
            </div>
        );
    }
}


export {Layout as PrivateLayout};
