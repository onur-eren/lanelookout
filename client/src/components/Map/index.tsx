import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const coordsOakland = {
  lat: 37.8131418,
  lng: -122.2662702
};

type MapComponentState = {
  lat: number,
  lng: number
}

class MapComponent extends React.Component<{}, MapComponentState> {
  _map: any

  constructor(props: any) {
    super(props);
    this.state = {
      ...coordsOakland
    };
    this.mapMove = this.mapMove.bind(this);
  }

  mapMove() {
    const coords: {lat: number, lng: number} = this._map.getCenter().toJSON();
    this.setState({ ...this.state, ...coords });
  }

  render() {
    const { lat, lng } = this.state;
    return (
      <div>
        <GoogleMap
          defaultZoom={13}
          defaultCenter={coordsOakland}
          ref={map => this._map = map}
          onDrag={this.mapMove}
          onDragEnd={this.mapMove}
        >
          <Marker position={{lat, lng}} />
        </GoogleMap>
        <p>lat: {lat}<br/>lng: {lng}</p>
      </div>
    );
  }
}

const WrappedMapComponent: any = withScriptjs(withGoogleMap((props:any): any => <MapComponent/>));

const OakMap = () => <WrappedMapComponent
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBQ4qDuM3ETjBY4Oa_H8sr8lGdir6nttfs"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>

export default OakMap;