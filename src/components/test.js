import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {
    logIn = async () => {
        const resp = await axios.get('/api/test/login.php');

        console.log('Log In Resp:', resp);
    }

    render() {
        return (
            <div>
                <h1 className="center">Testing 123!!</h1>
                <div className="center">
                    <button onClick={this.logIn} className="btn btn-large">Log In</button>
                </div>
            </div>
        );
    }
}

export default Test;