import {UserActionTypes,UiActionTypes} from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
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
                ...action.payload
            };
        default:
            return state;
    }
}