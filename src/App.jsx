import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.sass';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
          </Switch>
        </div>
      </Router>  
    </div>
  );
}

export default App;
