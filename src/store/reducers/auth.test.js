import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            authRedirectPath: '/',
            loading: false
        });
    });

    it('should store token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            authRedirectPath: '/',
            loading: false
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-userId'
        })).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            authRedirectPath: '/',
            loading: false           
        })
    });
})