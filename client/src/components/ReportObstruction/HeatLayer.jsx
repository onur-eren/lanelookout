import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import HeatmapLayer from '../PageHome/HeatmapLayer';
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
    longitudeExtractor,
    latitudeExtractor,
    intensityExtractor,
    radius
}) => {
    if(listReports)
        console.log(listReports);
    if (loading) return null;
    refetch();
    return(<HeatmapLayer
        points={listReports ? listReports.map(report => ([report.lat, report.lng])) : []}
        longitudeExtractor={longitudeExtractor}
        latitudeExtractor={latitudeExtractor}
        intensityExtractor={intensityExtractor}
        radius={radius}
    />);
};

export default graphql(listReportsQuery)(HeatLayer)