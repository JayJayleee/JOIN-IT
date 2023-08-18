import React, { Component } from "react";
import "./StreamComponent2.css";

import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

export default class OvVideoComponent2 extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();

    this.canvasRef = React.createRef();
    this.pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`;
      },
    });

    this.onResults = this.onResults.bind(this);
    this.state = {
      toggleSwitch: true,
      captureImage: this.props.captureImage,
      ImgList: [],
    };
    //환경 설정
    this.pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    this.startPoint = props.ExerciseInfodata.training.startPoint;
    this.middlePoint = props.ExerciseInfodata.training.middlePoint;
    this.endPoint = props.ExerciseInfodata.training.endPoint;

    //이벤트 등록
    //결과가 반환되었을 때 onresults 함수 실행
    this.pose.onResults(this.onResults);
  }

  toggleSwitch = () => {
    this.setState((prevState) => ({ toggleSwitch: !prevState.toggleSwitch }));
  };
  //각도 계산 및 표기
  culcurate(canvasCtx, poseLandmarks) {
    //각도 계산
    let angle =
      (Math.atan(
        (poseLandmarks[this.endPoint].y - poseLandmarks[this.middlePoint].y) /
          (poseLandmarks[this.endPoint].x - poseLandmarks[this.middlePoint].x)
      ) *
        180) /
        Math.PI -
      (Math.atan(
        (poseLandmarks[this.startPoint].y - poseLandmarks[this.middlePoint].y) /
          (poseLandmarks[this.startPoint].x - poseLandmarks[this.middlePoint].x)
      ) *
        180) /
        Math.PI;

    if (angle < 0) {
      angle = angle * -1;
    }

    if(angle > 90){
      angle = 180 - angle;
    }
    //글자 표기
    canvasCtx.fillText(
      Math.ceil(angle),
      poseLandmarks[this.middlePoint].x * 640 + 5,
      poseLandmarks[this.middlePoint].y * 480 - 5
    );
  }

  //반환된 결과 값 처리
  onResults(results) {
    // console.log(results);
    // console.log(results.poseLandmarks);

    if (this.canvasRef !== undefined && this.canvasRef.current !== undefined) {
      let canvasCtx = this.canvasRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        this.canvasRef.current.width,
        this.canvasRef.current.height
      );
      // Only overwrite existing pixels.
      canvasCtx.globalCompositeOperation = "source-in";
      canvasCtx.fillStyle = "#DBF2F1";
      canvasCtx.font = "bold 25px non-serif";
      canvasCtx.fillRect(
        0,
        0,
        this.canvasRef.current.width,
        this.canvasRef.current.height
      );

      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = "destination-atop";
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        this.canvasRef.current.width,
        this.canvasRef.current.height
      );
      canvasCtx.globalCompositeOperation = "source-over";

      if (this.state.toggleSwitch) {
        //선그리기

        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 3,
        });

        //점 그리기
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#00FF00",
          radius: 4,
        });
      }

      if (results.poseLandmarks !== undefined) {
        //어깨 중감점 계산
        let point33 = {
          x: (results.poseLandmarks[11].x + results.poseLandmarks[12].x) / 2,
          y: (results.poseLandmarks[11].y + results.poseLandmarks[12].y) / 2,
          z: (results.poseLandmarks[11].z + results.poseLandmarks[12].z) / 2,
          visibility: 1,
        };

        results.poseLandmarks.push(point33);

        //어깨 중감점 계산
        let point34 = {
          x: (results.poseLandmarks[11].x + results.poseLandmarks[12].x) / 2,
          y: (results.poseLandmarks[0].y + results.poseLandmarks[0].y) / 2,
          z: (results.poseLandmarks[0].z + results.poseLandmarks[0].z) / 2,
          visibility: 1,
        };

        results.poseLandmarks.push(point34);

        //각도 계산
        if (this.canvasRef.current !== null && this.state.toggleSwitch) {
          this.culcurate(canvasCtx, results.poseLandmarks);
        }
      }

      canvasCtx.restore();
    }
  }

  async componentDidMount() {
    await this.pose.initialize();
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }

    if (
      this.props &&
      this.props.user.streamManager.session &&
      this.props.user &&
      !!this.videoRef
    ) {
      this.props.user.streamManager.session.on(
        "signal:userChanged",
        (event) => {
          const data = JSON.parse(event.data);
          if (data.isScreenShareActive !== undefined) {
            this.props.user
              .getStreamManager()
              .addVideoElement(this.videoRef.current);
          }
        }
      );
    }
    const camera = new Camera(this.videoRef.current, {
      onFrame: async () => {
        try {
          if (this.videoRef.current !== undefined) {
            await this.pose.send({ image: this.videoRef.current });
          }
        } catch (error) {
          console.log("pose send width error");
          console.error("pose send width error");
        }
      },
      width: 640,
      height: 480,
    });
    camera.start();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
    // this.startPoint = props.ExerciseInfodata.training.startPoint;
    // this.middlePoint = props.ExerciseInfodata.training.middlePoint;
    // this.endPoint = props.ExerciseInfodata.training.endPoint;
  }

  // capture_image_send = () => {
  //   var formData = new FormData();
  //   let images = [];
  //   for (let index = 0; index < this.captureImage.length; index++) {
  //     formData.append("files", this.captureImage[index]);
  //   }

  //   fetch(
  //     `https://join-it.site/api/survey/before/image/${this.prescriptionId}`,
  //     {
  //       method: "Post",
  //       body: formData,
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

  takeScreenshot = () => {
    // canvasCapture();
    // capture_image_send();
  };

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} width={640} height={480} />
        <video
          autoPlay={true}
          id={"video-" + this.props.user.getStreamManager().stream.streamId}
          ref={this.videoRef}
          muted={this.props.mutedSound}
          className="OvVideo_video1"
        />
      </div>
    );
  }
}
