import React from "react";
import Dropzone from "react-dropzone";
import { LOCATION } from "../../constants/report";

const Upload = ({ uploadImage, setStatus }) => {
  const onDrop = (files) => {
    uploadImage(files[0]);
    setStatus(LOCATION);
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
