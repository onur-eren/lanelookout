import React, { useState } from "react";
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
import ReportType from './ReportType';

const ReportObstructionUI = (props) => {
  const [status, setStatus] = useState(UPLOAD);
  const [imgUrl, setImgUrl] = useState();
  const [coords, setCoords] = useState();
  const [reportType, setReportType] = useState(reportTypes[0][0]);

  switch(status) {
    case UPLOAD:
      return <Upload
        setImgUrl={setImgUrl}
        setStatus={setStatus}
      />;
    case LOCATION:
      return<>
      <ReportType
        setStatus={setStatus}
        setReportType={setReportType}
        reportType={reportType}
      />
      <Location
        setStatus={setStatus}
        initZoom={14}
        coords={coords}
        setCoords={setCoords}
      /></>;
    case DETAILS:
      return <Details
        setStatus={setStatus}
        imgUrl={imgUrl}
        coords={coords}
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