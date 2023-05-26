import './App.css';
import Universe from './Components/Universe';
import React from "react";
import { Canvas } from "react-three-fiber";

function App() {
  return (
	<div style={{ height: "100vh" }}>
	  <Universe />
  </div>
  );
}

export default App;
