import React, {Component} from 'react';
import {connect} from 'react-redux';

import {history} from '../../../helpers';
import {alertActions} from '../../../actions';

class Alert extends Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {alert} = this.props;

        return (
            !!alert.message &&
                <div className={`alert alert-success`}>{alert.message}</div>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
    
}

const connectedAlert = connect(mapStateToProps)(Alert);
export {connectedAlert as Alert};
