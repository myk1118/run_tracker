import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import NotFound from '../404';
import LogIn from './login';
import LogOut from './logout';
import SignUp from './sign_up';

export default props => {
    const { match } = props;

    return (
        <Switch>
            <Route path={`${match.path}/login`} component={LogIn} />
            <Route path={`${match.path}/logout`} component={LogOut} />
            <Route path={`${match.path}/sign-up`} component={SignUp} />
            {/* <Route component={NotFound} /> */}
        </Switch>
    )
}