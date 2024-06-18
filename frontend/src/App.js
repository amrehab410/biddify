import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AuctionDetails from './components/AuctionDetails';
import CreateAuction from './components/CreateAuction';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/auction/:id" component={AuctionDetails} />
        <Route path="/create-auction" component={CreateAuction} />
      </Switch>
    </div>
  );
}

export default App;
