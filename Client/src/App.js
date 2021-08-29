import './App.css';

import LoginPage from './pages/LoginPage'
import ChatRoom from './pages/ChatRoom'
import ClearChat from './pages/ClearChat'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App" style={{ justifyContent: 'center', display: 'flex' }}>

        <Switch>

          <Route exact path="/">
            <LoginPage />
          </Route>

          <Route exact path="/chatRoom">
            <ChatRoom />
          </Route>

          <Route exact path="/clearChat">
            <ClearChat />
          </Route>


        </Switch>

      </div>
    </Router>
  );
}

export default App;
