import React, { useState } from "react";
import {
  UPLOAD,
  LOCATION,
  DETAILS,
  SUBMISSION,
  COMPLETE,
  reportTypes
} from "../../constants/report";
import Upload from './Upload';
import Location from './Location';
import Details from './Details';

const ReportObstructionUI = (props) => {
  const [status, setStatus] = useState(LOCATION);
  const [imgUrl, setImgUrl] = useState();
  const [coords, setCoords] = useState();
  const [reportType, setReportType] = useState(reportTypes[0][0]);
  const [description, setDescription] = useState('');

  switch(status) {
    case UPLOAD:
      return <Upload
        setImgUrl={setImgUrl}
        setStatus={setStatus}
      />;
    case LOCATION:
      return <Location
        setStatus={setStatus}
        initZoom={14}
        coords={coords}
        setCoords={setCoords}
        setReportType={setReportType}
        setDescription={setDescription}
      />
    case DETAILS:
      return <Details
        setStatus={setStatus}
        imgUrl={imgUrl}
        coords={coords}
        reportType={reportType}
        description={description}
      />
    case SUBMISSION:
      return (<p>...</p>);
    case COMPLETE:
      return (<p>...</p>);
    default:
      return null;
  }
};

export default ReportObstructionUI;