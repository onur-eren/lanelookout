import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { DETAILS, coordsOakland } from "../../constants/report";
import { getUserLocation } from "./effects";
import Details from "./Details";
import { Button, Container, Header, StepDescription } from 'semantic-ui-react'
import ReportType from './ReportType';
import  './style.css';

const mapBottomOffset = 62;


const Location = ({ setStatus, initZoom, coords, setCoords,
  setReportType,
  reportType, setDescription }) => {
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
    console.log("saveLocation...");
    setCoords(center);
    setStatus(DETAILS);
  };
  const handleChange = (event) => {
    setDescription(event.currentTarget.value);
  };

  return (<>
    <ReportType
      reportType={reportType}
      setReportType={setReportType}
    />
        <textarea  className="fixtop"
          onChange={handleChange}
          placeholder="Describe report"
      ></textarea>
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
    <Button className="fixBottom" color='red' fluid size='massive' onClick={saveLocation}>Save</Button>

  </>
  );
};

export default Location;
