import React, { Component } from "react";
import "./StreamComponent2.css";
import OvVideoComponent2 from "./OvVideo2";

export default class StreamComponent2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
      ExerciseInfodata: this.props.ExerciseInfodata,
      isLoading: true,
      // captureImage: this.props.captureImage,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  toggleSwitch = () => {
    // Trigger a function in the GrandChildComponent
    this.grandChildComponentRef.toggleSwitch();
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="OT_widget-container">
        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent2
              ExerciseInfodata={this.state.ExerciseInfodata}
              user={this.props.user}
              ref={(ref) => (this.grandChildComponentRef = ref)}
              // capture={this.state.canvasCapture}
              // setCapture={this.props.setCapture}
              // captureImage={this.state.captureImage}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
