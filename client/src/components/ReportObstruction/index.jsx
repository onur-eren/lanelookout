import React, { useState, useEffect } from "react";
import { FORM, COMPLETE } from "../../constants/report";
import ReportMap from './ReportMap';
import ReportForm from "./ReportForm";
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getUserLocation } from "./effects";


// import Details from './Details';

const ReportObstructionUI = (props) => {
  const [status, setStatus] = useState(FORM);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [zoom, setZoom] = useState(14);
  const [isHeatmapOn, setIsHeatmapOn] = useState(true);
  useEffect(() => {
   
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

  const renderSwitch = (param) => {
    switch (param) {
      case FORM:
        return(<>
          <ReportForm
            setStatus={setStatus}
            coords={coords}
            setZoom={setZoom}
          />
        </>)
      case COMPLETE:
          return(<>
          {/* Report Obstruction */}
          <Button style={fixBottom} color='red' fluid as={Link} onClick={() => { setStatus(FORM) }} to="/report" size='massive'>Report Obstruction</Button>
        </>);
      default:
        return <></>;
    }
  }
const heatSwitch = (e)=>{
  setIsHeatmapOn(e.target.checked);
}
  return (<>
    
    <label for="isHeatmapOn">IsHeatOn</label>
    <input 
    type="checkbox"
    id="isHeatmapOn"
    name="isHeatmapOn"
    checked={isHeatmapOn}
    onChange={ heatSwitch } />
    { renderSwitch(status) }
    <ReportMap
      zoom={zoom}
      coords={coords}
      isHeatmapOn = {isHeatmapOn}
      setCoords={setCoords}
    />
    </>
  );

}

export default ReportObstructionUI;
