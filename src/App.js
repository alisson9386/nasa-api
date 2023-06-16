import './App.css';
import './Assets/style.scss'
import React from "react";
import { Switch, Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import history from './history';
import NavbarComponent from './Components/NavbarComponent';
import NearbyAsteroids from './Components/NearbyAsteroids';

function App() {
  return (
	<div>
	  <Router history={history}>
      <NavbarComponent/>
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route path="/nearbyAsteroids" component={NearbyAsteroids}/>
					</Switch>
			</Router>
  </div>
  );
}

export default App;
