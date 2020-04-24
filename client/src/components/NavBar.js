import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
 return(
     <div className='nav-bar'>
         <NavLink to='/'>Login</NavLink>
         <NavLink to='/colors' >Bubbles</NavLink> 
     </div>
 )
}

export default NavBar;