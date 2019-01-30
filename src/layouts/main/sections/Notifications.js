import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UncontrolledAlert } from 'reactstrap';

import {history} from '../../../helpers';
import {alertActions} from '../../../actions';

const styles = {
    top: '120px',
    width: '300px',
    paddingLeft: '20px',
    position: 'fixed',
    right: '20px'
}

class Notifications extends Component {

    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render () {
        const {alert} = this.props;

        return (
            !!alert.message &&
            <div style={styles}>
                <UncontrolledAlert color={alert.color} style={{ paddingRight: '60px' }}>
                    {alert.message}
                </UncontrolledAlert>
            </div>
        );
    };
};

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };

}

export default connect(mapStateToProps)(Notifications);
