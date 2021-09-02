import './App.css';
import LoginPage from './pages/LoginPage'
import ChatRoom from './pages/ChatRoom'
import ClearChat from './pages/ClearChat'
import MyTesting from './pages/testingPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React from 'react';

const App =  () => {
  return (
    <Router>
      <div className="App" style={{ justifyContent: 'center', display: 'flex' }}>

        <Switch>
          <Route path="/" exact component={LoginPage}>
          </Route>

          <Route path="/chatRoom" component={ChatRoom}>
          </Route>

          {/* <Route path="/chatRoom">
            <ChatRoom />
          </Route> */}
{/* 
          <Route exact path="/clearChat">
            <ClearChat />
          </Route> */}


        </Switch>

      </div>
    </Router>
  );
}

export default App;
