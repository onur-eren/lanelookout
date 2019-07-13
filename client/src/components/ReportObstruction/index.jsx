import React, { useState } from "react";
import { FORM,  COMPLETE } from "../../constants/report";
import Upload from './Upload';
import Location from './Location';
import Heat from "./Heat";
// import Details from './Details';
import ReportType from './ReportType';
import { Button, Header, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ReportObstructionUI = (props) => {
  const [status, setStatus] = useState(COMPLETE);
  const [imgUrl, setImgUrl] = useState('demo.png');
  const [coords, setCoords] = useState({ lat: null, lng: null });
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
 
  const ADDREPORT = gql`
  mutation createReport($imgUrl: String, $lat: Float, $lng: Float, $contact: String, $description: String, $reporttype: String) {
    createReport(imgUrl: $imgUrl, lat: $lat, lng: $lng, contact: $contact, description: $description, reporttype: $reporttype) {
      id
      imgUrl
    }
  }
  `;
  
  const ReportForm = () => {
    return <Container style={fixTop}>
      <Header as='h1' textAlign="center">Report Obstruction</Header>
      <Button color='orange' fluid as={Link} to="/" size='huge'>Home</Button>
      <br />
      <Upload setImgUrl={setImgUrl} />
      <br />
      <ReportType
        reportType={reportType}
        setReportType={setReportType}
      />
      <br />

      <Mutation
        mutation={ADDREPORT}
        variables={{
          imgUrl: imgUrl,
          lat: coords.lat,
          lng: coords.lng,
          reporttype: reportType
        }}
        onCompleted={() => {
          setZoom(19);
          setStatus(COMPLETE);
        }}
        update={(cache, { data: { createReport: { id, imgUrl, lat, lng, description, reportType } } }) => {
          console.log('id: ' + id + ' added.' + imgUrl);
        }}
      >
        {createReport => <button onClick={createReport}>Submit</button>}
      </Mutation>
      {/* <Button color='red' fluid size='huge' onClick={savereport}>Save</Button> */}
    </Container>;
  }

  switch (status) {
    case FORM:
      return (<>
      <ReportForm />
        <Location
          setZoom={setZoom}
          zoom={zoom}
          setCoords={setCoords}
          coords={coords}
        /></>);
    case COMPLETE:
      return (<>
      <Heat
          zoom={11}
      />
        <Button color='red' fluid as={Link} to="/report" size='massive'>Report Obstruction</Button>
        </>);
    default:
      return (<p>DEFAULT</p>)
  }

}

export default ReportObstructionUI;
