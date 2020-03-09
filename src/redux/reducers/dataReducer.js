import {DataActionTypes,UiActionTypes} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

export default function(state = initialState, action)
{
    let index;
    switch(action.type)
    {
        case UiActionTypes.LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case DataActionTypes.SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };
        case DataActionTypes.LIKE_SCREAM:
        case DataActionTypes.UNLIKE_SCREAM:
            index = state.screams.findIndex((scream)=>scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return {
                ...state
            };
        case DataActionTypes.DELETE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(index,1);
            return {
                ...state
            };
        case DataActionTypes.POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            };
        default:
            return state;
    }
}