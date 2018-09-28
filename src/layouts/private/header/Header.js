import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                    <div className="container">
                        <Link to={"/login"} className="navbar-brand">Start Bootstrap</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive" aria-controls="navbarResponsive"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/"} className="nav-link" activeStyle={{color: "white"}}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link" activeStyle={{color: "white"}}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link" activeStyle={{color: "white"}}>Registeration</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
