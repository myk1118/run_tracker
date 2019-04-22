import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../../actions';

class LogOut extends Component {
    componentDidMount(){
        this.props.logOut();
    }

    render() {
        return (
            <div className="logout">
                <div className="logout-header center">
                    <h1>Thank you for tracking your run with us.</h1>
                    <h2>You have been logged out!</h2>
                </div>
            </div>
        )
    }
}

export default connect(null, {
    logOut: logOut
})(LogOut);
