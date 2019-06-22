import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import { Button, Container, Form, Header } from 'semantic-ui-react'

const Mission = () => {
    return (
      <Container className="home-container">
        <Header as="h1" textAlign="center">Mission statement</Header>
        <p>
            LaneLookout strives to promote safer cycling through improved infrastructure and design in Oakland and the East Bay.
        </p>
        <Header as="h1" textAlign="center">Vision</Header>
        <p>
While the East Bay continues to promote cycling-oriented transit, many cyclists feel unheard and unsafe. Cyclists of the East Bay endure potholed streets, parked cars in the bike lane, and a lack of cycling infrastructure. LaneLookout seeks to be that voice for the unheard cyclist. 
        </p>
        <p>
We want to hear about what disrupts your commute or makes your trip unsafe. By functioning as a crowd-sourced central database for these issues, LaneLookout serves as an outlet or “anger translator” for your frustrations. We turn your frustrations into change.
        </p>
        <p>
By gathering a database of cyclists reported issues, we bring hard data to the fight for safer cycling. We know where to drive city resources. We can leverage our database to support existing advocacy efforts and city projects in the face of resistance. Most importantly, LaneLookout’s database represents the cycling community’s needs and frustrations.
        </p>
      </Container>
    );
};

export default Mission

