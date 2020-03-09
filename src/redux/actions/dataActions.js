import {DataActionTypes, UiActionTypes} from '../types';
import axios from 'axios';

// Get All Screams
export const getScreams = ()=>dispatch=>{
    dispatch({type: UiActionTypes.LOADING_DATA});
    axios.get('/screams')
    .then(res=>{
        dispatch({
            type: DataActionTypes.SET_SCREAMS,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({type: DataActionTypes.SET_SCREAMS,payload: []});
    })
};

// Like a Scream
export const likeScream = (screamId)=> dispatch => {
    axios.get(`/scream/${screamId}/like`)
    .then(res=>{
        dispatch({type: DataActionTypes.LIKE_SCREAM, payload: res.data});      
    })
    .catch(err=>console.log(err));
};

// Unlike a Scream
export const unlikeScream = (screamId)=> dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
    .then(res=>{
        dispatch({type: DataActionTypes.UNLIKE_SCREAM, payload: res.data});      
    })
    .catch(err=>console.log(err));
};

//Delete a Scream
export const deleteScream = (screamId)=> dispatch =>{
    axios.delete(`/scream/${screamId}`)
    .then(()=>{
        dispatch({type: DataActionTypes.DELETE_SCREAM, payload: screamId});
    })
    .catch(err => console.log(err));
};
