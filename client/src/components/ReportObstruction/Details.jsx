import React from "react";

const Details = ({ image, coords, uploadReport }) => {
  return (
    <>
      <p>image: {image}</p>
      <p>coords: [{coords.lat}, {coords.lng}]</p>
      <p><button onClick={() => uploadReport()}>upload report</button></p>
    </>
  );
};

export default Details;
