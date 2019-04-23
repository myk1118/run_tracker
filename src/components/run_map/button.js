import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export default props => {
    const { status, start, pause, reset } = props;
    switch (status) {
        case 'stopped':
            return (<button onClick={start} className="btn btn-info">Start</button>);

        case 'running':
            return (<button onClick={pause} className="btn btn-info">Pause</button>);

        case 'paused':
            return (
                <Fragment>
                    <button onClick={start} className="btn btn-info">Resume Run</button>
                    <NavLink to="/runmap/results"><button onClick={reset} className="btn btn-info">End Run</button></NavLink>
                </Fragment>
            );
    }
}