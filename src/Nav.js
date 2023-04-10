import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
const Navbar = () => {
    return (
        <div className='custom-nav'>
            <div className='logo'>
                <h1>H Hacking</h1>
            </div>
            <div className='menu-items'>  
                 <ul>

                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/book'>Book</Link></li>
                 </ul>
                
               </div>

        </div>
    );
};
export default Navbar;