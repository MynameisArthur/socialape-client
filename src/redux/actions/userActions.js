import {UserActionTypes,UiActionTypes} from '../types';
import axios from 'axios';

export const loginUser = (userData,history)=> (dispatch)=>{
    dispatch({type: UiActionTypes.LOADING_UI});
    axios
      .post('/login', userData)
      .then((res) => {        
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken',FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;  
        dispatch(getUserData());     
        dispatch({type: UiActionTypes.CLEAR_ERRORS});
        history.push('/');
      })
      .catch((err) => {
        dispatch({
            type: UiActionTypes.SET_ERRORS,
            payload: err.response.data
        });
      });
};


export const getUserData = ()=> (dispatch)=>{
    axios.get('/user')
    .then(res => {
        dispatch({type: UserActionTypes.SET_USER, payload: res.data});
    })
    .catch(err=>console.error(err));
};