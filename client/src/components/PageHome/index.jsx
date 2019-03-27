import React from "react";
import { Link } from 'react-router-dom'
import { put, call, select, takeLatest } from "redux-saga/effects";
import { Button, Container, Header } from 'semantic-ui-react'

const PageHome = () => (
  <Container className="main-container">
    <Header as='h1' textAlign="center">Lane Lookout</Header>
    <Button fluid as={Link} to="/report" size='massive'>Report Obstruction</Button>
    <br/>
    <Button fluid as={Link} to="/nopers" size='massive'>View Reports</Button>
  </Container>
);

export default PageHome;
