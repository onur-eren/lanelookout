import React from "react";
import { Link } from 'react-router-dom'
import { put, call, select, takeLatest } from "redux-saga/effects";
import { Button, Container, Header } from 'semantic-ui-react'

const PageHome = () => (
  <Container className="main-container">
    <Header as='h1' textAlign="center">Lane Lookout</Header>
    <Button fluid as={Link} to="/report" size='massive'>Report Obstruction</Button>
    <br/>
    <Button fluid as={Link} to="/view_reports" size='massive'>View Reports</Button>
    <Header as="h4" textAlign="center"><a href="https://s3-us-west-1.amazonaws.com/oak-bike/ll_privacy_policy.pdf" target="_blank">Privacy policy</a></Header>
  </Container>
);

export default PageHome;
