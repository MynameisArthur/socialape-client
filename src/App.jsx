import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.sass';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Navbar from './components/Navbar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import {Provider} from 'react-redux';
import store from './redux/store';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
let authenticated; 
if(token)
{
  const decodedToken = jwtDecode(token);  
  if(decodedToken.exp * 1000 < Date.now())
  {
    window.location.href = '/login';
    authenticated = false;
  }
  else{
    authenticated = true;
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
                <AuthRoute path="/login" component={Login} authenticated={authenticated}/>
                <AuthRoute path="/signup" component={Signup} authenticated={authenticated}/>
              </Switch>
            </div>
          </Router>         
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
