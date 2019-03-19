import React from "react";
import Uploader from "../Uploader";

type PageReportState = {
  latitude: number | null,
  longitude: number | null
}

class PageReport extends React.Component<{}, PageReportState> {
  constructor(props: any) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          // alert(position);
          // this.setState({ latitude: 69, longitude: 69 });
          const { longitude, latitude } = position.coords;
          this.setState({ longitude, latitude });
        },
        (error: any) => {
          alert(error.message);
        }
      );
    } else {
      this.setState({ latitude: 69, longitude: 69 });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Report Obstruction</h1>
        <hr/>
        <p>latitude: {this.state.latitude || 'NA'}</p>
        <p>longitude: {this.state.longitude || 'NA'}</p>
        <hr/>
        <Uploader/>
      </React.Fragment>
    );
  }
}

export default PageReport;
