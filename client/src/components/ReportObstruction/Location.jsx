
import React, { useState, useEffect } from "react";

import { Map, Marker, TileLayer } from 'react-leaflet'
import { getUserLocation } from "./effects";
import HeatLayer from "./HeatLayer";

const Location = ({
  zoom,
  coords,
  setCoords,
  isHeatmapOn
}) => {

  const [center, setCenter] = useState({ lat: null, lng: null });
  const [height, setHeight] = useState(document.documentElement.clientHeight);

  const setDefaultCenter = () => {
    if (coords.lat !== null) {
      console.log('setDefaultCenter');
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
      });
    }
  };

  // RESIZE EVENT
  const handleResize = () => {
    setHeight(document.documentElement.clientHeight);
  }
  // DRAG EVENT
  const onDrag = (event) => {
    // setCenter(event.target.getCenter());
    setCoords(event.target.getCenter());
  }
  // CLICK EVENT
  const onClick = (event) => {
    setCenter(event.latlng);
    setCoords(event.latlng);
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



  const heatMap = (isHeatmapOn)=>{
    if(isHeatmapOn){
      return <HeatLayer
      m={m => m[1]}
      radius={12}
  />
    }
    return'';
  }

  return (
    <>
    <Map
      center={center}
      zoom={zoom}
      style={{ height }}
      onDrag={onDrag}
      onClick={onClick}
    >
    {heatMap(isHeatmapOn)}
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
    </>
  );
};



export default Location

