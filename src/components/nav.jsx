// copied from Chloe Fugle starterpack

import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav(props) {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/edit">Edit</NavLink></li>
        <li><NavLink to="/import">Import</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
