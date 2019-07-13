import React, { useState, useEffect } from "react";
import { FORM, COMPLETE } from "../../constants/report";
import Location from './Location';
import HeatMap from "./HeatMap";
import ReportForm from "./ReportForm";
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getUserLocation } from "./effects";


// import Details from './Details';

const ReportObstructionUI = (props) => {
  const [status, setStatus] = useState(COMPLETE);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    getUserLocation().then(position => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);


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

  

  switch (status) {
    case FORM:
      return (<>
        <ReportForm 
          setStatus={setStatus}
          coords={coords}
          setZoom={setZoom}
        />
        <Location
          coords={coords}
          zoom={zoom}
          setCoords={setCoords}
        />
        </>);
    case COMPLETE:
      return (<>
        <HeatMap
          zoom={zoom}
          coords={coords}
        />
        <Button style={fixBottom} color='red' fluid as={Link} onClick={()=>{setStatus(FORM)}} to="/report" size='massive'>Report Obstruction</Button>
      </>);
    default:
      return (<p>DEFAULT</p>)
  }

}

export default ReportObstructionUI;
