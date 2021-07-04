import React from 'react'
import './nav.css';
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <div>
            <nav className='nav-class'>
                <h3 className='logo'>Logo</h3>
                <ul className='list'>
                    <Link to='/'>
                    <li>Home</li>
                    </Link>
                    <Link to='/about'>
                    <li>About</li>
                    </Link>
                    <Link to='/movies'>
                    <li>Movies</li>
                    </Link>
                </ul>

            </nav>
        </div>
    )
}

