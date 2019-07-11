import React, { useState } from "react";
import {
  UPLOAD,
  LOCATION,
  DETAILS,
  SUBMISSION,
  COMPLETE,
} from "../../constants/report";
import Upload from './Upload';
import Location from './Location';
import Details from './Details';
import ReportType from './ReportType';
import { Button, Header, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ReportObstructionUI = (props) => {
  const [status, setStatus] = useState(LOCATION);
  const [imgUrl, setImgUrl] = useState('demo.png');
  const [coords, setCoords] = useState();
  const [zoom, setZoom] = useState(14);
  const [reportType, setReportType] = useState();


  const fixTop = {
    position: 'absolute',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { height: 1 },
    zIndex: 9900,
    left: 0,
    right: 0,
    alignItems: "center"
  };
  const savereport = () => {
    setStatus(DETAILS);
  }

  switch (status) {
    case LOCATION:
      return <>
        <Container style={fixTop}>
          <Header as='h1' textAlign="center">Report Obstruction</Header>
          <Button color='orange' fluid as={Link} to="/" size='huge'>Home</Button>
          <br />
          <Upload
            setImgUrl={setImgUrl}
            setStatus={setStatus}
          />
          <br />
            <ReportType
              reportType={reportType}
              setReportType={setReportType}
            />
            <br />
          <Button color='red' fluid size='huge' onClick={savereport}>Save</Button>
        </Container>

        
    <Location
          initZoom={zoom}
          setCoords={setCoords}
          coords={coords}
        />
      </>;
    case DETAILS:
      return <Details
      setStatus={setStatus}
      setZoom={setZoom}
        imgUrl={imgUrl}
        coords={coords}
        reportType={reportType}
      />;
    case SUBMISSION:
      return (<p>sad</p>);
    case COMPLETE:
      return (<p>...</p>);
    default:
      return null;
  }
};

export default ReportObstructionUI;
