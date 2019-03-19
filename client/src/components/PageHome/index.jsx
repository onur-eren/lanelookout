import React from "react";
import { Link } from 'react-router-dom'

const PageHome = () => (
  <div>
    <h1>Home Page</h1>
    <ul>
      <li><Link to="/report">Report Obstruction</Link></li>
      <li><Link to="/nopers">Bad Link</Link></li>
    </ul>
  </div>
);

export default PageHome;
