import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  return (
    <div className="sidebar" style={{"height": "500px"}}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/issues">View Issues List</Link>
        </li>
        <li>
          <Link to="/addIssue">Add New Issue</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;