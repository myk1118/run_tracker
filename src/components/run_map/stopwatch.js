import React, { Component } from 'react';
import Time from './format_time';
import './stopwatch.scss';
import axios from 'axios';
class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'stopped',
            start: null,
            elapsed: 0,
            distance: 100,
            pace: 100,
            calories: 100,
        }
        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
    }
    start() {
        const { start, elapsed } = this.state;
        let newStart = new Date().getTime();
        if (start) {
            newStart -= elapsed;
        }
        this.setState({
            status: 'running',
            start: newStart
        });
        // setTimeout(this.update, 10);
        setInterval(() => {
            this.update();
        }, 10);
    }
    pause() {
        this.setState({
            status: 'stopped'
        })
    }
    reset() {
        const {elapsed} = this.state;
        if(this.state.status === 'stopped'){
            this.postCurrentRun(elapsed);
        this.setState({
            status: 'stopped',
            start: null,
            elapsed: 0
        });
        }
    }
    update() {
        const { status, start } = this.state;
        if (status === 'running') {
            this.setState({
                elapsed: new Date().getTime() - start
            })
            setTimeout(this.update, 10);
        }
    }

    postCurrentRun = (elapsed) => {
        const {distance, pace, calories} = this.state;
        axios.get(`/api/addrun.php?distance=${distance}&time=${elapsed}&pace=${pace}&calories=${calories}`).then((resp) => {
            console.log('this is response:', resp);
        });
    }
    render() {
        const { elapsed, status } = this.state;
        return (
            <div className="watchContainer">
                <h1 className="time"><Time elapsed={elapsed} /></h1>
                {/* <hr className="horizontalLine" /> */}
                {/* <p className="status">{status}</p> */}
                {/* <p className="buttons">
                    <button onClick={this.start} className='btn btn-outline-success mx-3'>Start</button>
                    <button onClick={this.stop} className='btn btn-outline-danger mx-3'>Stop</button>
                    <button onClick={this.reset} className='btn btn-outline-warning mx-3'>Reset</button>
                </p> */}
            </div>
        )
    }
}

export default Stopwatch;
