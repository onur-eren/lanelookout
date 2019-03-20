import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { DETAILS, coordsOakland } from "../../constants/report";
import { getUserLocation } from "./effects";

const mapBottomOffset = 60;

const Location = ({initZoom, coords, setStatus, setCoords }) => {
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
  // useEffect(() => {
  //   setCenter(coords);
  // }, [coords]);

  const [zoom, setZoom] = useState(initZoom);
  const onZoom = (event) => {
    setZoom(event.target.getZoom());
  }

  useEffect(() => {
    console.log("getUserLocation...");
    getUserLocation().then(position => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const saveLocation = () => {
    setCoords(center);
    setStatus(DETAILS);
  };

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
      <button onClick={saveLocation}>Save Location</button>
    </>
  );
};

export default Location;
