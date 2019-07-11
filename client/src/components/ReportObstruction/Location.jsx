import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { DETAILS, coordsOakland } from "../../constants/report";
import { getUserLocation } from "./effects";
import { Container, Header } from 'semantic-ui-react'

const mapBottomOffset = 0;
const Location = ({ initZoom, setStatus, setCoords, coords }) => {
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
    setCoords(center);

  }

  const [zoom, setZoom] = useState(initZoom);
  const onZoom = (event) => {
    setZoom(event.target.getZoom());
  }
  const centerMapOnCoords = () => {
    console.log("coords...");
    setCenter({
      lat: Number(coords.lat),
      lng: Number(coords.lng),
    });
  };
  
  const centerMapOnLocation = () => {
    console.log("getUserLocation...");
    getUserLocation().then(position => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setCoords(center);
    });
  };

  useEffect(() => {
    if (coords !== undefined) {
      centerMapOnCoords();
      return;
    }
    centerMapOnLocation();
  }, []);

  // const saveLocation = () => {
  //   setCoords(center);
  //   setStatus(DETAILS);
  // };

  return (
    <>
      <Map
        center={center}
        zoom={zoom}
        onDrag={onDrag}
        onZoom={onZoom}
        style={{ height }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} />
      </Map>
    </>
  );
};

export default Location;
