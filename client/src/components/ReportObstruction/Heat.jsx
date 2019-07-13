
import React from "react";

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import HeatmapLayer from '../PageHome/HeatmapLayer';

const listReportsQuery = gql`
  query {
    listReports {
        id
        lat
        lng
    }
  }
`;
const HeatMap = ({ data: { listReports } }) => {
  if(listReports) console.log(listReports);
  let zoom = 12;
  return (<></>);
  // return <HtmlApp
  // listReports={listReports}
  // zoom={zoom}
  // />
}
// const HtmlApp = ({listReports,zoom}) => {
//   if(listReports) console.log(listReports);
//   if(zoom) console.log(zoom);
//   return (
//     <></>
//   );
// }
 

    //   <Map
    //   center={center}
    //   zoom={zoom}
    //   onDrag={onDrag}
    //   onClick={onClick}
    //   onZoom={onZoom}
    //   style={{ height }}
    // >

    //   <HeatmapLayer
    //     points={listReports ? listReports.map(report => ([report.lat, report.lng])) : []}
    //     longitudeExtractor={m => m[1]}
    //     latitudeExtractor={m => m[0]}
    //     intensityExtractor={m => parseFloat(m[2])}
    //     radius={12}
    //   />
    //   <TileLayer
    //     attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   {/* <Marker position={center} /> */}
    //   </Map>
// Create our enhancer function.

// Enhance our component.
const xx = graphql(listReportsQuery);
const AppWithData =(props)=>(xx){
    console.log(xx);
    return <p>{props.zoom}</p>
}
const Demo = () => {
  return <p>Demo</p>
}


export default AppWithData;

