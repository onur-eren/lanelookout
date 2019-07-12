import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { DETAILS, coordsOakland } from "../../constants/report";
import { getUserLocation } from "./effects";
import { Container, Header } from 'semantic-ui-react'

const Location = ({ initZoom, setStatus, setCoords, coords }) => {
  // <Map> requires an absolute height
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  const [center, setCenter] = useState(coordsOakland);
  const [zoom, setZoom] = useState(initZoom);

  // DRAG EVENT
  const onDrag = (event) => {
    setCenter(event.target.getCenter());
    setCoords(center);

  }

  // ZOOM EVENTS
  const onZoom = (event) => {
    setZoom(event.target.getZoom());
  }

  // SET DEFAULT CENTER
  const setDefaultCenter = () => {
    if (coords.lat !== null) {
      setCenter({
        lat: Number(coords.lat),
        lng: Number(coords.lng),
      });
      return;
    }
    else {
      getUserLocation().then(position => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCoords(center);
      });
    }
  };

  // RESIZE EVENT
  const handleResize = () => {
    setHeight(document.documentElement.clientHeight);
  }
  // called on componentDidMount & componentDidUpdate
  useEffect(() => {
    setDefaultCenter();
    handleResize();
    // ADD EVENT Listeners
    window.addEventListener("resize", handleResize);
    // componentWillUnmount 
    return () => {
      console.log("Cleaned up");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // RETURN
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
