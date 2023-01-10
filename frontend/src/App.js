import './App.css';
import {BrowserRouter as Router , Switch ,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import User from './components/User';
import Accounts from './components/Accounts';
import Individual from './components/Individual';
import { useState } from 'react';

function App() {
  const [community,setCommunity] = useState(null);
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/'><Home/></Route>
          <Route exact path='/login'><Login/></Route>
          <Route exact path='/signup'><Signup/></Route>
          <Route exact path='/user'><User/></Route>
          <Route exact path="/account"><Accounts/></Route>
          <Route exact path="/post/:id"><Individual/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
