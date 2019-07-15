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
import Description from './Description';
import ReportType from './ReportType';

const ReportObstructionUI = (props) => {
  const [status, setStatus] = useState(LOCATION);
  const [imgUrl, setImgUrl] = useState();
  const [coords, setCoords] = useState();
  const [reportType, setReportType] = useState(reportTypes[0][0]);
  const [description, setDescription] = useState(reportTypes[0][0]);

  const fixTop = {
    position: 'absolute',
    shadowColor: '#000',
    zIndex: 9900,
    left: 0,
    right: 0,
    alignItems: "center"
  };
  switch(status) {
    case UPLOAD:
      return <Upload
        setImgUrl={setImgUrl}
        setStatus={setStatus}
      />;
    case LOCATION:
      return<>
      <div style={fixTop}>
        <ReportType
          setStatus={setStatus}
          setReportType={setReportType}
          setDescription={setDescription}
          reportType={reportType}
        />
        <Description
          setDescription={setDescription}
        />
      </div>
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
        reportType={reportType}
        description={description}
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