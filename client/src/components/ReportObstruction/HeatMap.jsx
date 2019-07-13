
import React, {useState, useEffect} from "react";

import { Map, Marker, TileLayer } from 'react-leaflet'
import { getUserLocation } from "./effects";
import HeatLayer from "./HeatLayer";

const HeatMap = ({zoom, coords }) => {
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  // RESIZE EVENT
  const handleResize = () => {
    setHeight(document.documentElement.clientHeight);
  }
   // SET DEFAULT CENTER
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


  return(
    <Map
    center={center}
    zoom={zoom}
    style={{ height }}
  >
    <HeatLayer
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
  );
};



export default HeatMap

