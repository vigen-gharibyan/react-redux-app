import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        this.props.dispatch(userActions.getCurrent());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    componentWillReceiveProps(nextProps) {
        const {users} = nextProps;
        const currentUser = users.user || null;
        this.setState({currentUser});
    }

    render() {
        const {currentUser} = this.state;

        return (
            <div className="col-md-6 col-md-offset-3">
                {
                    !!currentUser &&
                    <h1>Hi { currentUser.username } </h1>
                }

                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {users, authentication} = state;
    const {user} = users;

    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};