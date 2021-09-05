import './App.css';
import LoginPage from './pages/LoginPage'
import ChatRoom from './pages/ChatRoom'
// import AddUser from './pages/AddUser'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from 'react';

const App = () => {
  return (
    <Router>
      <div className="App" style={{ justifyContent: 'center', display: 'flex' }}>
        <Switch>
          <Route path="/" exact component={LoginPage}>
          </Route>

          <Route path="/chatRoom" component={ChatRoom}>
          </Route>

          {/* <Route path="/addUser" component={AddUser}>
          </Route> */}

        </Switch>

      </div>
    </Router>
  );
}

export default App;
