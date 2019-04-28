import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export default props => {
    const { status, start, pause, reset} = props;
    switch (status) {
        case 'stopped':
            return (<button onClick={start} className="btn btn-info btn-lg">Start</button>);

        case 'running':
            return (<button onClick={pause} className="btn btn-info btn-lg">Pause</button>);

        case 'paused':
            return (
                <Fragment>
                    <button onClick={start} className="btn btn-info btn-lg">Resume Run</button>
                    <NavLink to="/runmap/results"><button onClick={reset} className="btn btn-danger btn-lg">End Run</button></NavLink>
                </Fragment>
            );
    }
}
