import React, {Component} from 'react';

class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <footer className="py-5 bg-dark">
                <div className="container">
                    <div className="text-center">
                        <p>
                            <a href="http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example"
                                target="_blank">React + Redux - Application</a>
                        </p>
                        <p className="m-0 text-center text-white">
                            Copyright &copy; Your Website 2018
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
