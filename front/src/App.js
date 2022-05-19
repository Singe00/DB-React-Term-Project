import React from 'react';
import './App.css';
import Login from "./component/Login"
import Main from "./component/Main"
import Register from "./component/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
		<div className = 'App'>
		  <BrowserRouter>
				<Routes>
			  		<Route path="/" element={<Login/>}></Route>
					<Route path="/Register" element={<Register/>}></Route>
					<Route path="/Main" element={<Main/>}></Route>
			  </Routes>
		  </BrowserRouter>
	  	</div>
  );
}

export default App;
