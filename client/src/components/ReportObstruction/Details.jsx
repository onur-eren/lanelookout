import React from "react";
import gql from "graphql-tag";
import { graphql, Mutation } from "react-apollo";

const createReportMutation = gql`
  mutation createReport($imgUrl: String, $lat: Float, $lng: Float, $contact: String, $description: String) {
    createReport(imgUrl: $imgUrl, lat: $lat, lng: $lng, contact: $contact, description: $description) {
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
            },
        })
    }

    render() {
        return (
            <div>
                Your report has been saved!
            </div>
        );
    }
}

export default graphql(createReportMutation, { name: 'createReportMutation' })(Details)

