import React, { useState, useEffect } from "react";
import HeatmapLayer from '../PageHome/HeatmapLayer';
import gql from "graphql-tag";
import { graphql,withApollo } from "react-apollo";

const listReportsQuery = gql`
query {
  listReports {
      id
      lat
      lng
  }
}
`;
const HeatLayer = ({
    data: { loading, refetch, listReports },
    m,
    radius
}) => {
    console.log('called');
    if(listReports)
      console.log(listReports);
    return(<HeatmapLayer
        points={listReports ? listReports.map(report => ([report.lat, report.lng])) : []}
        longitudeExtractor={m => m[1]}
        latitudeExtractor={m => m[0]}
        intensityExtractor={m => parseFloat(m[2])}
        radius={12}
    />);
};

export default graphql(listReportsQuery)(HeatLayer)