import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-green">
                <h2>
                    <Link to={'/'}>IF_Q</Link>
                </h2>

                <ul>
                    <li>
                        <Link to={'/signin'} className='navbar-sign-btn'>Sign In</Link>
                    </li>
                    <li>
                        <Link to={'/signup'} className='navbar-sign-btn'>Sign Up</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-red">

            </div>
        </nav>
    )
}

export default Navbar