import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { DETAILS, coordsOakland } from "../../constants/report";
import { Button, Container, Form, Header } from 'semantic-ui-react'
import HeatmapLayer from './HeatmapLayer';
import { Link } from 'react-router-dom'
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

const mapBottomOffset = 60;
const initZoom = 13;

const Heatmap = ({ data: { loading, listReports} }) => {
  // <Map> requires an absolute height
  const [height, setHeight] = useState(document.documentElement.clientHeight - mapBottomOffset);
  useEffect(() => {
    const handleResize = () => {
      setHeight(document.documentElement.clientHeight - mapBottomOffset);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  const [center, setCenter] = useState(coordsOakland);
  const onDrag = (event) => {
    setCenter(event.target.getCenter());
  }

  const [zoom, setZoom] = useState(initZoom);
  const onZoom = (event) => {
    setZoom(event.target.getZoom());
  };

    return (
      <>
      <Form loading={loading}>
          <Button fluid as={Link} to="/" size='massive'>Home</Button>
        </Form>
          <Map
            center={center}
            zoom={zoom}
            onDrag={onDrag}
            onZoom={onZoom}
            style={{ height }}
          >
              <HeatmapLayer
                points={listReports && listReports.map(report => ([report.lat, report.lng]))}
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])}
                radius={12}
                />
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </Map>
      </>
    );
};

export default graphql(listReportsQuery)(Heatmap)
