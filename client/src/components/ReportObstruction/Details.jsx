import React from "react";
import gql from "graphql-tag";
import { graphql, Mutation } from "react-apollo";
import { UPLOAD } from "../../constants/report";
import {
  withRouter
} from 'react-router-dom'

const createReportMutation = gql`
  mutation createReport($imgUrl: String, $lat: Float, $lng: Float, $contact: String, $description: String, $reportType: String) {
    createReport(imgUrl: $imgUrl, lat: $lat, lng: $lng, contact: $contact, description: $description, reportType: $reportType) {
        id
    }
  }
`;


class Details extends React.Component {
    componentDidMount = async () => {
        let res = await this.props.createReportMutation({
            variables: {
                imgUrl: this.props.imgUrl,
                lat: this.props.coords.lat,
                lng: this.props.coords.lng,
                reportType: this.props.reportType,
                description: this.props.description
            },
        })

        // Start counting when the page is loaded
         this.timeoutHandle = setTimeout(()=>{
           this.props.history.push('/')
         }, 3000);
    }

    componentWillUnmount(){
         clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }

    render() {
        return (
            <div>
                Your report has been saved! Stand by while we redirect you...
            </div>

        );
    }
}

export default withRouter(graphql(createReportMutation, { name: 'createReportMutation' })(Details))
