import types from './types';

export function logIn(user) {
    console.log('Log In Action Creator, user data:', user);

    return {
        type: types.LOG_IN,
        email: user.email
    }
}

export function logOut(){
    return{
        type: types.LOG_OUT
    }
}