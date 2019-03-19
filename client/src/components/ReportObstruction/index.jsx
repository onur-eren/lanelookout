import React from "react";
import {
  UPLOAD,
  LOCATION,
  DETAILS,
  SUBMISSION,
  COMPLETE,
} from "../../constants/report";
import Upload from './Upload';
import Location from './Location';
import Details from './Details';

const ReportObstructionUI = (props) => {
  const {
    status,
    image,
    coords,
    setStatus,
    setCoords,
    getLocation,
    uploadImage,
    uploadReport,
  } = props;

  switch(status) {
    case UPLOAD:
      return <Upload
        uploadImage={uploadImage}
        setStatus={setStatus}
      />;
    case LOCATION:
      return <Location
        initZoom={14}
        coords={coords}
        setStatus={setStatus}
        setCoords={setCoords}
        getLocation={getLocation}
      />;
    case DETAILS:
      return <Details
        image={image}
        coords={coords}
        uploadReport={uploadReport}
      />;
    case SUBMISSION:
      return (<p>...</p>);
    case COMPLETE:
      return (<p>...</p>);
    default:
      return null;    
  }
};

export default ReportObstructionUI;
