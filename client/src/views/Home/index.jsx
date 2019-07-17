import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { coordsOakland } from 'src/constants'
import { Button, Form, Header } from 'semantic-ui-react'
import HeatmapLayer from './HeatmapLayer'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const listReportsQuery = gql`
  query {
    listReports {
      id
      lat
      lng
    }
  }
`

const mapBottomOffset = 228
const initZoom = 13

const Home = ({ data: { loading, listReports } }) => {
  const [height, setHeight] = useState(document.documentElement.clientHeight - mapBottomOffset)
  useEffect(() => {
    const handleResize = () => {
      setHeight(document.documentElement.clientHeight - mapBottomOffset)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [center, setCenter] = useState(coordsOakland)
  const onDrag = event => {
    setCenter(event.target.getCenter())
  }

  const [zoom, setZoom] = useState(initZoom)
  const onZoom = event => {
    setZoom(event.target.getZoom())
  }

  return (
    <div className="home-container">
      <Form className="home-top" loading={loading}>
        <Header as="h1" textAlign="center" className="home-header">
          LaneLookout
        </Header>
        <Header as="h4" textAlign="center" className="home-sub-header">
          A non-profit app to help Oakland cyclists report obstructions in biking infastructure.
          Created by an{' '}
          <a href="https://openoakland.org" target="_blank" rel="noopener noreferrer">
            OpenOakland
          </a>{' '}
          group, a Code For America brigade.{' '}
        </Header>
        <div className="home-links">
          <Link to="/about">About</Link> |{' '}
          <a
            href="https://oak-bike.s3-us-west-1.amazonaws.com/LaneLookout+Privacy+Notice.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            Privacy Notice
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/lanelookout/lanelookout"
            rel="noopener noreferrer"
            target="_blank"
          >
            Source code
          </a>{' '}
          |{' '}
          <a href="https://www.gofundme.com/lanelookout" rel="noopener noreferrer" target="_blank">
            Support
          </a>
        </div>
      </Form>
      <Map center={center} zoom={zoom} onDrag={onDrag} onZoom={onZoom} style={{ height }}>
        <HeatmapLayer
          points={listReports && listReports.map(report => [report.lat, report.lng])}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => parseFloat(m[2])}
          radius={12}
        />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>

      <Button color="red" fluid as={Link} to="/report" size="massive">
        Report Obstruction
      </Button>
    </div>
  )
}

export default graphql(listReportsQuery)(Home)
