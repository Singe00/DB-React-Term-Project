import React from 'react';
import './App.css';
import Login from "./component/Login"
import Main from "./component/Main"
import Register from "./component/Register"
import Review from "./component/Review"
import ReviewDetail from "./component/ReviewDetail"
import Write from "./component/Write"
import EmptyPage from "./component/EmptyPage"
import EditPage from "./component/EditPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
	
  return (
		<div className = 'App'>
		  <BrowserRouter>
				<Routes>
			  		<Route exact path="/" element={<Login/>}></Route>
					<Route path="/Register" element={<Register/>}></Route>
					<Route path="/Main" element={<Main/>}></Route>
					<Route path="/Review/:id" element={<Review/>}></Route>
					<Route path="/Write" element={<Write/>}></Route>
					<Route path="/EditPage" element={<EditPage/>}></Route>
					<Route path="/ReviewDetail/:reviewNumber" element={<ReviewDetail/>}></Route>
			  		<Route path="/*" element={<EmptyPage/>}></Route>
			  </Routes>
		  </BrowserRouter>
	  	</div>
  );
}

export default App;
