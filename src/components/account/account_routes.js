import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import NotFound from '../404';
import LogIn from './login';
import LogOut from './logout';
import SignUp from './sign_up';
import Runs from '../runs/runs';
import auth from '../../hoc/auth';

export default props => {
    const { match } = props;
    return (
        <Switch>
            {/* <Route exact path={`${match.path}/`} component={auth(Runs)} /> */}
            <Route path={`${match.path}/login`} component={auth(LogIn, '/', false)} />
            {/* <Route path={`${match.path}/logout`} component={LogOut} /> */}
            <Route path={`${match.path}/logout`} component={auth(LogOut, '/account/login', true)} />
            {/* <Route path={`${match.path}/sign-up`} component={auth(SignUp, '/account', false)} /> */}
            {/* <Route component={NotFound} /> */}
        </Switch>
    )
}
