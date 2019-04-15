import React, { Component } from 'react';
import axios from 'axios';

const apiPath = '/api/test.php';
const proxyExample = `
"proxy": {
  "/api/*": {
    "target": "http://localhost:8000"
  }
}

`;

class ApiTest extends Component {
    state = {
        apiStatus: null,
        help: null,
        message: `Attempting API request to: "${apiPath}"`
    }

    componentDidMount(){
        setTimeout(() => {
            this.testApi();
        }, 0);
    }

    resetAndRunTest = () => {
        this.setState({
            apiStatus: null,
            help: null,
            message: `Attempting API request to: "${apiPath}"`
        }, () => {
                setTimeout(() => {
                    this.testApi();
                }, 750);
        });
    }

    async testApi(){
        try {
            const { data, status } = await axios.get(apiPath);

            if(status === 200 && typeof data === 'string'){
                const error = new Error('API test failed, it looks like your proxy is not setup. See below for more detailed help.');

                error.response = { status: 305 };

                throw error;
            }

            console.log('Test Resp:', data);

            this.setState({
                apiStatus: true,
                help: null,
                message: data.message
            });
        } catch(error){
            const { message, response: { status } } = error;

            console.log('Test Error Status:', status);
            console.log('Test Error Message:', message);
            let userMessage = '';
            let help = null;

            switch(status){
                case 305:
                    console.log('Need proxy setup');
                    userMessage = message;
                    help = (
                        <div className="help">
                            <ol>
                                <li>In the <code>package.json</code> file you should have a proxy property that looks like:
                                <pre>{proxyExample}</pre>
                                </li>
                                <li>If you do not see the proxy config in the <code>package.json</code> file then add it
                                <ul>
                                        <li><strong>NOTE:</strong> Your port number may be different, set the port number to whatever port YOUR Apache server is running on</li>
                                    </ul>
                                </li>
                                <li>If the proxy config was in your <code>package.json</code> make sure it matches the above example, but with your port number. Also make sure it is not nested inside one of the other properties.</li>
                                <li>After making changes to the <code>package.json</code> file you will need to restart the Node Dev Server
                                    <ol>
                                        <li>In your terminal press <code>ctrl + c</code> on the keyboard to stop the server</li>
                                        <li>Then run the command to start the server again: <code>npm start</code></li>
                                    </ol>
                                </li>
                                <li>If the above steps didn't fix your problem, reach out to an instructor</li>
                            </ol>
                        </div>
                    );
                    break;
                case 404:
                    console.log('Apache server running, but root directory is wrong');
                    break;
                case 504:
                    console.log('Proxy setup, no server running or running on wrong port');
                    userMessage = 'Unable to communicate with Apache server, either Apache is not running or your proxy settings are incorrect. See below steps for more detailed help.';
                    help = (
                        <div className="help">
                            <ol>
                                <li>Is your Apache server running?
                                    <ul>
                                        <li>You should have started an Apache server using MAMP, XAMMP, Docker, or something similar</li>
                                    </ul>
                                </li>
                                <li>If your Apache server is running, verify what port it is running on, then check the proxy settings in the <code>package.json</code> file
                                    <ul>
                                        <li>
                                            <div>Here is what the proxy object looks like:</div>
                                            <pre>{proxyExample}</pre>
                                        </li>
                                        <li>The port number that you see in the <code>package.json</code> file proxy settings ("target": "http://localhost:<mark>8000</mark>") must be the same as the port your Apache server is running on
                                            <li>If your port numbers do not match do ONE of the following:
                                                <ol>
                                                    <li>Change the port your Apache server is running on to match the port number in the <code>package.json</code> proxy config</li>
                                                    <li>If you don't want to or can't change your Apache port then change the port number in the <code>package.json</code> proxy config. If you change the <code>package.json</code> file you must restart the Node Dev Server:
                                                        <ol>
                                                            <li>In your terminal press <code>ctrl + c</code> on the keyboard to stop the server</li>
                                                            <li>Then run the command to start the server again: <code>npm start</code></li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                        </li>
                                    </ul>
                                </li>
                                <li>If neither of the above options fixed your issue, reach out to an instructor</li>
                            </ol>
                        </div>
                    );
                    break;
                default:
                    console.log('!!========== Unknown error !!==========');
            }

            this.setState({
                apiStatus: false,
                help,
                message: userMessage
            });
        }
    }

    render(){
        const { apiStatus, help, message } = this.state;

        const status = apiStatus
            ? {
                class: 'success',
                text: 'OK'
            } : apiStatus === null
                ? {
                    class: 'testing',
                    text: 'TESTING'
                }
                : {
                    class: 'failed',
                    text: 'OFFLINE'
                }

        return (
            <div className="api-test">
                <div className="api-header center">
                    <h1>API Status: [<span className={`api-status ${status.class}`}>{status.text}</span>]</h1>
                    <h2>{message}</h2>
                </div>
                <div className="help-container">{help}</div>
                <div className="api-actions center">
                    <button className="btn" onClick={this.resetAndRunTest}>Test API</button>
                </div>
            </div>
        );
    }
}

export default ApiTest;