import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import { Button, Container, Form, Header } from 'semantic-ui-react'

const About = () => {
    return (
      <Container className="home-container">
        <Header as="h1" textAlign="center">About</Header>
        <p>
        LaneLookout, a part of Code for America’s OpenOakland brigade, is an all volunteer effort centered around safer cycling. We are a diverse group of professionals committed to a thriving, inclusive, and vibrant Oakland and the East Bay.   
        </p>
      </Container>
    );
};

export default About

