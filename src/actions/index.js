import types from './types';
import axios from 'axios';

export const checkAuth = () => async dispatch => {
    const { data: { success, email } } = await axios.get('/api/check_auth.php');

    if (success) {
        return dispatch({
            type: types.LOG_IN,
            email
        });
    }
    return dispatch({
        type: types.LOG_OUT
    });
}

export function logIn(user) {
    return function (dispatch) {
        axios.post('/api/sign_in.php', user).then(resp => {
            console.log('Log In Resp:', resp);
            if (resp.data.success) {
                localStorage.setItem('loggedIn', 'true');

                dispatch({
                    type: types.LOG_IN,
                    email: resp.data.email
                });
            } else {
                dispatch({
                    type: types.LOG_IN_ERROR
                });
            }
        });
    }
}

export function logOut() {
    return function (dispatch) {
        axios.get('/api/logout.php').then(resp => {
            localStorage.removeItem('loggedIn');

            dispatch({
                type: types.LOG_OUT
            });
        });
    }
}

export function signUp(user) {
    return {
        type: types.SIGN_UP,
        email: user.email
    }
}

