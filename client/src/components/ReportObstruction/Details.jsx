import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

// const CREATE_REPORT = gql`
//   mutation createReport(
//     $imgUrl: String!,
//     $lat: Number,
//     $lng: Number,
//     $contact
//   ) {
//     createReport(imgUrl: $imgUrl ) {
//         id
//     }
//   }
// `;

const Details = ({ imgUrl, coords }) => {
  return (
    <>
      <p>imgUrl: {imgUrl}</p>
      <p>coords: [{coords.lat}, {coords.lng}]</p>
    </>
  );
};

export default Details;
