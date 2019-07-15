import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { DETAILS, coordsOakland } from "../../constants/report";
import { getUserLocation } from "./effects";
import Details from "./Details";
import { Button, Container, Header, StepDescription } from 'semantic-ui-react'
import ReportType from './ReportType';

const fixBottom = {
  position: 'absolute',
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { height: 1 },
  zIndex: 9900,
  left: 0,
  bottom: 0,
  alignItems: "center"
};

const fixTop = {
  position: 'absolute',
  shadowColor: '#000',
  zIndex: 9900,
  left: 0,
  right: 0,
  alignItems: "center",
  marginHorizontal:30
};
const Location = ({ setStatus, initZoom, coords, setCoords,
  setReportType,
  reportType, setDescription }) => {
  // <Map> requires an absolute height
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  useEffect(() => {
    const handleResize = () => {
      setHeight(document.documentElement.clientHeight);
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
    <div style={fixTop}>
      <ReportType
        setStatus={setStatus}
        setReportType={setReportType}
        reportType={reportType}
      />
      <center>
          <textarea
          onChange={handleChange}
          style={{ width: 400, height: 70 }}
          placeholder="Describe report"
        ></textarea>
      </center>
    </div>
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
    <Button style={fixBottom} color='red' fluid size='massive' onClick={saveLocation}>Save</Button>

  </>
  );
};

export default Location;
