import React, { useState, useEffect } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet'
import { coordsOakland } from "../../constants/report";

const Location = ({ zoom, setCoords, coords }) => {
  // <Map> requires an absolute height
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  const [center, setCenter] = useState(coordsOakland);

  // DRAG EVENT
  const onDrag = (event) => {
    setCenter(event.target.getCenter());
    setCoords(center);
  } 
  // CLICK EVENT
  const onClick = (event) => {
    setCenter(event.latlng);
    setCoords(event.latlng);
  }

  

  // RESIZE EVENT
  const handleResize = () => {
    setHeight(document.documentElement.clientHeight);
  }
  // called on componentDidMount & componentDidUpdate
  useEffect(() => {
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
      <Map
        center={center}
        zoom={zoom}
        style={{ height }}
        onDrag={onDrag}
        onClick={onClick}
      >
         
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} />
      </Map>
  );
};

export default Location;
