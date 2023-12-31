// copied from Chloe Fugle starterpack

import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.scss';

function Nav(props) {
  return (
    <div>
      <nav>
        <ul className="links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/edit">Edit</NavLink></li> {/* leaving edit link for now for easy access, can remove later once flow added */}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
