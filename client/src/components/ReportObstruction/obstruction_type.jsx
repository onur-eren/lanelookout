import React from "react";

class ObstructionType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Select'};

    this.handleChange = this.handleChange.bind(this);
  }
handleChange(event) {
    this.setState({value: event.target.value});
  }
render() {
    return (
      <form>
        <label>
          Obstruction Type:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="parking">Parking</option>
            <option value="broken_road">Broken Road</option>
            <option value="debris">Debris</option>
            <option value="other">Other</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
   }
 }