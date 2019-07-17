import React from "react";
import Dropzone from "react-dropzone";
import { Input, Form, Icon, Button, Container, Header } from 'semantic-ui-react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { graphql } from 'react-apollo'
import { S3_URL, coordsOakland } from "src/constants";
import gql from 'graphql-tag';

const reportMutation = gql`
    mutation createReport($imgUrl: String!, $lat: Float!, $lng: Float!, $typeIncident: String!, $description: String!) {
      createReport(
            imgUrl: $imgUrl
            lat: $lat
            lng: $lng
            typeIncident: $typeIncident
            description: $description
        )
      {
        id
      }
}`

const HEIGHT_OFFSET = 450

class ReportObstruction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            center: coordsOakland,
            zoom: 14,
            filePath: '',
            uploadingImage: false,
            processing: false,
            typeIncident: '',
            description: ''
        }
    }

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            this.setState({
              center: { lat: latitude, lng: longitude },
            });
          },
        );
    }

    // TODO: Probably worth using a guid generator npm package here instead
    makeid = () => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 24; i += 1) text += possible.charAt(Math.floor(Math.random() * 62));
        return text;
    };

    onDrop = (files) => new Promise((resolve, reject) => {
        this.setState({uploadingImage: true})

        const image = files[0]
        const type = image.type.split('/')[1];
        const fileName = `${this.makeid()}.${type}`
        const formData = new FormData();
        formData.append('key', fileName);
        formData.append('file', image);
        const options = { method: "POST", body: formData };
        fetch(S3_URL, options)
            .then(() => { 
                this.setState({uploadingImage: false})
                console.log(`Upload succeeded: ${S3_URL}${fileName}`)
                this.setState({filePath: `${S3_URL}${fileName}`})
            })
            .catch(error => reject(error));
    });

    onZoom = (event) => {
        this.setState({zoom: event.target.getZoom()})
    }

    onDrag = (event) => {
        this.setState({center: event.target.getCenter()})
    }

    submitReport = async () => {
        this.setState({processing: true})
        const { center, filePath, typeIncident, description } = this.state

        let {data} = await this.props.mutate({
            variables: { imgUrl: filePath, lat: center.lat, lng: center.lng, typeIncident, description}
        })
        this.setState({processing: false})

        if (!data.createReport.id) {
            alert("Error!")
        }

        else {
            this.props.history.push('/')
        }
    }

    handleRadioChange = (e, { value }) => this.setState({ typeIncident: value })

    handleInputChange = (e, {name, value}) => this.setState({ description: value })

    render = () => {
        const {center, description, zoom, filePath, uploadingImage, processing, typeIncident } = this.state

        return (
            <>
            <Container className="main-container">
            <Header as='h1' textAlign="center">Report Obstruction</Header>
            <Header as='h3' textAlign="">1. Specify the location</Header>
      <Map
        center={center}
        zoom={zoom}
        onDrag={this.onDrag}
        onZoom={this.onZoom}
        style={{height: document.documentElement.clientHeight - HEIGHT_OFFSET}}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} />
      </Map>
            <Header as='h3' textAlign="">2. Add details</Header>
            <Form>
                <Form.Field>
      <label>Short description</label>
      <Input fluid placeholder='e.g. car parked in the bike lane.' value={description} onChange={this.handleInputChange} />
    </Form.Field>
        <Form.Group >
          <Form.Radio
            label='Parking'
            value='parking'
            checked={typeIncident === 'parking'}
            onChange={this.handleRadioChange}
          />
          <Form.Radio
            label='Broken road'
            value='broken road'
            checked={typeIncident === 'broken road'}
            onChange={this.handleRadioChange}
          />
          <Form.Radio
            label='Debris'
            value='debris'
            checked={typeIncident === 'debris'}
            onChange={this.handleRadioChange}
          />
          <Form.Radio
            label='Other'
            value='other'
            checked={typeIncident === 'other'}
            onChange={this.handleRadioChange}
          />
        </Form.Group>
            </Form>
            <Header as='h3' textAlign="">3. Upload photo</Header>
            <Dropzone onDrop={this.onDrop}>
            {({getRootProps, getInputProps, isDragActive}) => {
                return (
                    <div
                    {...getRootProps()}
                    className={`dropzone ${isDragActive ? 'dropzone--isActive' : ''}`}
          >
            <input {...getInputProps()} />
                {filePath ?  
                <Button icon fluid size='large' disabled labelPosition='left'>
                File uploaded
              <Icon name='checkmark' />
                </Button>
                :
                    <Button loading={uploadingImage} disabled={uploadingImage} icon size='large' labelPosition='left' fluid>
      Tap here to upload a photo
      <Icon name='upload' />
    </Button>
                }
          </div>
        )
      }}
    </Dropzone>
  </Container>
    <Button id="submit-report-btn" onClick={this.submitReport} loading={processing} disabled={processing} color='green' size='massive' fluid>Submit</Button>
    </>
  );
};

}

export default graphql(reportMutation)(ReportObstruction)
