import {UserActionTypes,UiActionTypes} from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
};


export default function(state = initialState, action)
{
    switch(action.type)
    {
        case UserActionTypes.SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case UserActionTypes.SET_UNAUTHENTICATED:
            return initialState;
        case UserActionTypes.SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case UserActionTypes.LOADING_USER:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}