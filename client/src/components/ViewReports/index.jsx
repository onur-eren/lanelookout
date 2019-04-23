import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { DETAILS, coordsOakland } from "../../constants/report";
import { Button, Container, Header } from 'semantic-ui-react'
import HeatmapLayer from './HeatmapLayer';
import { Link } from 'react-router-dom'


export const points = [
[37.81173258,-122.32513479],
[37.76737559,-122.27947704],
[37.77663943,-122.25980928],
[37.80479155,-122.35611757],
[37.75183947,-122.30445769],
[37.83617435,-122.33878949],
[37.74900933,-122.26927393],
[37.79411245,-122.33279014],
[37.80555317,-122.19062467],
[37.87609362,-122.27589464],
[37.87609363,-122.27589464],
[37.87609365,-122.27589464],
[37.87609361,-122.27589464],
[37.87609362,-122.27589462]
];



const mapBottomOffset = 60;
const initZoom = 13;

const Heatmap = () => {
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
      <Button fluid as={Link} to="/" size='massive'>Home</Button>
      <Map
        center={center}
        zoom={zoom}
        onDrag={onDrag}
        onZoom={onZoom}
        style={{ height }}
      >
          <HeatmapLayer
            points={points}
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

export default Heatmap;
