import React from 'react';
import './App.css';
import Login from "./component/Login"
import Main from "./component/Main"
import Register from "./component/Register"
import Review from "./component/Review"
import Write from "./component/Write"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from 'axios';


function App() {
	
  return (
		<div className = 'App'>
		  <BrowserRouter>
				<Routes>
			  		<Route path="/" element={<Login/>}></Route>
					<Route path="/Register" element={<Register/>}></Route>
					<Route path="/Main" element={<Main/>}></Route>
					<Route path="/Review/:id" element={<Review/>}></Route>
					<Route path="/Write" element={<Write/>}></Route>
			  </Routes>
		  </BrowserRouter>
	  	</div>
  );
}

export default App;
