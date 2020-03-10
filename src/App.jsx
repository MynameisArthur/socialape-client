import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.sass';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Navbar from './components/layout/Navbar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import {Provider} from 'react-redux';
import store from './redux/store';
import {UserActionTypes} from './redux/types';
import {logoutUser,getUserData} from './redux/actions/userActions';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

if(token)
{
  const decodedToken = jwtDecode(token);  
  if(decodedToken.exp * 1000 < Date.now())
  {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
  else{
    store.dispatch({type: UserActionTypes.SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>        
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home}/>
                <AuthRoute path="/login" component={Login} />
                <AuthRoute path="/signup" component={Signup} />
              </Switch>
            </div>
          </Router>         
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
