import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        loading: true
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        loading: false
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        loading: false
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.LOGOUT
    }
}

export const setAuthTimeout = (timeoutTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, timeoutTime);
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let authMethodUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDbq9Rv5cr1Z0Nh6_OedjvbGrRjJwiSsVI';
        if (isSignup) {
            authMethodUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDbq9Rv5cr1Z0Nh6_OedjvbGrRjJwiSsVI';
        }
        axios.post(authMethodUrl, authData)
        .then(response => {
            const expirationDate = new Date(Date.now() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(
                response.data.idToken,
                response.data.localId
            ));
            dispatch(setAuthTimeout(response.data.expiresIn * 1000));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error));
        });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= Date.now()) {
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(setAuthTimeout(expirationDate.getTime() - Date.now()));
            };
        }
    };
}