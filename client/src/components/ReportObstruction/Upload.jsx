import React from "react";
import Dropzone from "react-dropzone";
import { LOCATION } from "../../constants/report";
import { doUploadImage } from "./effects";

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
                <p>Try dropping some files here, or click to select files to upload.</p>
            }
          </div>
        )
      }}
    </Dropzone>
  );
};

export default Upload;
