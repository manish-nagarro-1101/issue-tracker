import React from 'react';
import SideMenu from '../components/SideMenu';

const HomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to the Issue Tracker</h1>
      <SideMenu />
      {/* <p>
        This is the home page. You can view the issue list by going to the{' '}
        <Link to="/issues">Issue List</Link> page.
        <tr><td><Link to="/addIssue">Add Issue</Link></td></tr>
      </p> */}
    </div>
  );
};

export default HomePage;
