import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () =>
  <div>
    <ul>
      <li><Link to="/client">Client</Link></li>
      <li><Link to="/server">Server</Link></li>
    </ul>
  </div>

export default Navigation;