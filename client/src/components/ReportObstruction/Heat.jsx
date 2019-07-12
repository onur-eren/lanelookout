import { Link } from 'react-router-dom'
import { put, call, select, takeLatest } from "redux-saga/effects";
import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { DETAILS, coordsOakland } from "../../constants/report";
import { Button, Container, Form, Header } from 'semantic-ui-react'
import HeatmapLayer from '../PageHome/HeatmapLayer';
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const listReportsQuery = gql`
  query {
    listReports {
        id
        lat
        lng
    }
  }
`;
const Heatmap = ({coords, data: { loading, listReports } }) => {

  return (
    <HeatmapLayer
      points={listReports ? listReports.map(report => ([report.lat, report.lng])) : []}
      longitudeExtractor={m => m[1]}
      latitudeExtractor={m => m[0]}
      intensityExtractor={m => parseFloat(m[2])}
      radius={12}
    />
  );
}

export default graphql(listReportsQuery)(Heatmap)

