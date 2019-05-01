import React from "react";
import Dropzone from "react-dropzone";
import { LOCATION } from "../../constants/report";
import { doUploadImage } from "../../redux/report/effects";
import { Button, Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const Upload = ({ setImgUrl, setStatus }) => {
  const onDrop = (files) => {
    doUploadImage(files[0])
    .then(url => {
      setImgUrl(url);
      setStatus(LOCATION);
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
  <Container className="main-container">

    <Header as='h1' textAlign="center">Report Obstruction</Header>
    <Button fluid as={Link} to="/" size='massive'>Home</Button>
    <br/>
    <Dropzone onDrop={onDrop}>
      {({getRootProps, getInputProps, isDragActive}) => {
        return (
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'dropzone--isActive' : ''}`}
          >
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop files here...</p> :
                <Button fluid size='massive'>Tap here to upload a photo</Button>
            }
          </div>
        )
      }}
    </Dropzone>
  </Container>
  );
};

export default Upload;
