import './App.css';
import Universe from './Components/Universe';
import React from "react";
import { Switch, Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import history from './history';
import NavbarComponent from './Components/NavbarComponent';

function App() {
  return (
	<div>
	  <Router history={history}>
      <NavbarComponent/>
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route path="/universe" component={Universe}/>
					</Switch>
			</Router>
  </div>
  );
}

export default App;
