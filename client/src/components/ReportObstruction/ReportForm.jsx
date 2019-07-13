import React, { useState } from "react";
import { FORM, COMPLETE } from "../../constants/report";

import { Button, Header, Container } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import Upload from './Upload';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ReportType from './ReportType';

const ADDREPORT = gql`
  mutation createReport($imgUrl: String, $lat: Float, $lng: Float, $contact: String, $description: String, $reporttype: String) {
    createReport(imgUrl: $imgUrl, lat: $lat, lng: $lng, contact: $contact, description: $description, reporttype: $reporttype) {
      id
      imgUrl
    }
  }
  `;
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

const ReportForm = ({setCoords,coords,setStatus,zoom,setZoom}) => {
    const [imgUrl, setImgUrl] = useState('demo.png');
    const [reportType, setReportType] = useState();

    
    return <>
    <Container style={fixTop}>
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
    </Container>
    <Button style={fixBottom} color='red' fluid as={Link} onClick={()=>{setStatus(COMPLETE)}} to="/report"  size='massive'>Go To Heatmap</Button>
    </>;
  }

  export default ReportForm;