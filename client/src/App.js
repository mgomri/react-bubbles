import React, { useState } from "react";
import Login from "./components/Login";
import { Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';
import NavBar from './components/NavBar';

function App() {
  return (
    
      <div className="App">
        <NavBar/>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path='/colors' component={BubblePage}
        />
         
      </div>
    
  );
}

export default App;
