import React from "react";
import Dropzone from "react-dropzone";
import { LOCATION } from "../../constants/report";
import { doUploadImage } from "../../redux/report/effects";
import { Button, Container } from 'semantic-ui-react'


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
                <Button color='orange' fluid size='huge'>Tap here to upload a photo</Button>
            }
          </div>
        )
      }}
    </Dropzone>
  );
};

export default Upload;
