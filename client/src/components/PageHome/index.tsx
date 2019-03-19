import React from "react";
import { Link } from 'react-router-dom'

import { Query } from "react-apollo";
import gql from "graphql-tag";

const PageHome = () => (
  // <Query
  //   query={gql`
  //     {
  //       yay
  //     }
  //   `}
  // >
  //   {({ loading, error, data }) => {
  //     if (loading) return <p>Loading...</p>;
  //     if (error) return <p>Error: {error}</p>;

  //     return (
        <div>
          <h1>Home Page</h1>
          <p>stuff</p>
          <ul>
            <li><Link to="/report">Report Obstruction</Link></li>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/nopers">Bad Link</Link></li>
          </ul>
          <hr/>
          <p>Server data:</p>
          {/* <ul>{data.yay}</ul> */}
          <hr/>
        </div>
  //     );
  //   }}
  // </Query>
);

export default PageHome;
