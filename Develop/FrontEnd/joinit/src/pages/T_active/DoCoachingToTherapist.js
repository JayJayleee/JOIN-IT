import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import Webcam from "react-webcam";

import StreamComponent2 from "./../Openvidu2/stream/StreamComponent2";
import ChatComponent from "../Openvidu/chat/ChatComponent";
import UserModel from "../Openvidu/models/user-model";
import PatientStatus from "./PatientStatus/PatientStatus";

import "./DoCoachingToTherapist.css";
import { Navigate } from "react-router-dom";

var localUser = new UserModel();
const APPLICATION_SERVER_URL = "https://demos.openvidu.io";

class DoCoachingToTherapist extends Component {
  // 컴포넌트가 생성될때 먼저 호출되서 초기화 담당
  constructor(props) {
    super(props);
    this.hasBeenUpdated = false;
    // session Id 규칙 = prescriptionId + join-it + prescriptionId
    let sessionName =
      window.location.pathname.substring(20, window.location.pathname.length) +
      "join-it" +
      window.location.pathname.substring(20, window.location.pathname.length);
    let userName = "therapist";
    // 참가자 목록
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "none",
      currentVideoDevice: undefined,
      ExerciseInfodata: [],
      // 운동 분류 선택을 위한 state
      ExerciseList: [],
      SelectedExercise: 0,
      SelectedExerciseList: [],
      // ChangedExercise: 0,
      isLoading: true,
      //이미지 캡쳐
      ImgList: [],
      captureImage: false,
      sessionEnd: false,
      isChangeExercise: false,
      prescriptionId: window.location.pathname.substring(
        20,
        window.location.pathname.length
      ),
    };
    // 바인드작업
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.getExerciseData = this.getExerciseData.bind(this);
  }
  coachingCapture = () => {
    this.setState({ captureImage: true });
  };

  // 환부 - 운동 분류를 가져오는 함수
  getExerciseList() {
    axios.get("/api/training/jointMapping").then((res) => {
      const training = res.data;
      this.setState({ ExerciseList: training });
    });
  }
  // 운동종류에 따른 운동 리스트를 바꾸는 함수
  changeSelectedExerciseList = (e) => {
    const select = e.target.value;
    if (select) {
      axios.get(`/api/training/list/${select}`).then((res) => {
        // console.log("분류별 리스트 조회", res);
        const result = res.data;

        this.setState({ SelectedExerciseList: result });
      });
    }
  };

  componentDidMount() {
    this.getExerciseList();

    const getprescriptionId = window.location.pathname.substring(
      20,
      window.location.pathname.length
    );

    // axios 연결

    axios
      .get(`/api/coaching/therapist/${getprescriptionId}`)
      .then((res) => {
        if (res.data && res.data.result) {
          const ExerciseInfodata = res.data.result;
          this.setState({ ExerciseInfodata });
        } else {
          console.error("Invalid response format:", res.data);
          // 에러 처리 로직 추가
        }
      })
      .catch((error) => {
        console.error("Error fetching ExerciseInfodata:", error);
        // 에러 처리 로직 추가
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });

    // joinsession 연결
    this.joinSession();
  }

  toggleSwitchInGrandChild = () => {
    // Trigger a function in the GrandChildComponent via the ChildComponent
    this.childComponentRef.toggleSwitch();
  };

  // // 규성이가 작성한 함수. 아래에서 추가해서 분류 선택 추가 예정
  getExerciseData = () => {
    const activeExercise = document.getElementById("activeExercise").value;
    // axios 연결

    axios
      .get(`/api/training/${activeExercise}`)
      .then((res) => {
        const training = res.data;

        const ExerciseInfodata = this.state.ExerciseInfodata;
        ExerciseInfodata.training = training;
        this.setState({ ExerciseInfodata: ExerciseInfodata }, async () => {
          await this.setState({ isChangeExercise: true });
          await this.setState({ isChangeExercise: false });
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  // 컴포넌트가 언마운트 되었을때 실행되는 함수
  // 이벤트 리스너 삭제 후 leaveSession 호출
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    this.leaveSession();
  }

  // 이벤트가 로드되지 않으면 leaveSession 호출
  onbeforeunload(event) {
    this.leaveSession();
  }

  // OpenVidu 객체 초기화 후 세션 연결
  // 1. OpenVidu 객체를 생성
  // 2. state에 있는 session 객체를 초기화
  // 3. subscribeToStreamCreated 함수를 호출하여, 새로운 스트림이 생성될 때마다 해당 스트림을 구독
  // 4. connectToSession 함수를 호출하여, 세션에 연결
  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      async () => {
        this.subscribeToStreamCreated();
        await this.connectToSession();
      }
    );
  }

  // 세션 연결 함수
  // 토큰이 존재하면 connect 함수 호출, token 전달
  // 토큰이 없다면 토큰 요청
  async connectToSession() {
    if (this.props.token !== undefined) {
      this.connect(this.props.token);
    } else {
      try {
        var token = await this.getToken();
        this.connect(token);
      } catch (error) {
        console.error(
          "There was an error getting the token:",
          error.code,
          error.message
        );
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error getting the token:", error.message);
      }
    }
  }

  // 세션에 토큰 커넥팅
  // 성공여부에 따라 connectwebcam 함수 호출
  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }

  // 웹캠 연결 함수 처리
  async connectWebCam() {
    // OV.getUserMedia를 통해 오디오, 비디오 소스를 받아오고 Ov.getDevices로 디바이스 목록을 가져옴
    await this.OV.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
    });
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");

    // OV.initPublisher를 통해 오디오, 비디오 소스를 설정
    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640X480",
      frameRate: 60,
      insertMode: "APPEND",
    });

    // session.publish() 함수를 호출하여, 로컬 유저의 스트림을 세션에 추가
    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    // 로컬 유저 정보를 state와 localUser 객체에 저장하고, subscribeToUserChanged와 subscribeToStreamDestroyed 함수를 호출하여 유저 변경 및 스트림 종료 이벤트를 처리
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    // sendSignalUserChanged 함수를 호출하여, 로컬 유저의 정보를 신호 메시지로 전달
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });
    // 스트림이 재생될 때, updateLayout 함수를 호출하여 레이아웃을 업데이트
    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          publisher.videos[0].video.parentElement.classList.remove(
            "custom-class"
          );
        });
      }
    );
  }

  // 참가자 목록을 업데이트하고, 정렬하여 state.subscribers에 저장
  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          // sendSignalUserChanged 함수를 호출하여, 로컬 유저의 정보를 신호 메시지로 전달
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
          });
        }
      }
    );
  }

  // 세션 연결을 종료합니다.
  // 이 함수는 컴포넌트가 componentWillUnmount()를 통해 호출
  leaveSession() {
    // Empty all properties...
    this.OV = null;
    // state 및 OpenVidu 객체를 초기화
    this.setState({
      session: this.state.session.disconnect(),
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "OpenVidu_User" + Math.floor(Math.random() * 100),
      localUser: undefined,
      chatDisplay: "none",
      currentVideoDevice: undefined,
      ExerciseInfodata: [],
      ExerciseList: [],
      SelectedExerciseList: [],
      ChangedExercise: 0,
      isLoading: true,
      sessionEnd: false,
    });

    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
  }

  // 스트림이 종료된 후, 해당 스트림을 subscribers에서 삭제
  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  // 새로운 스트림이 생성될 때마다, 해당 스트림에 대한 subscriber 객체를 생성하고, 세션에 구독
  // joinsession에 들어가있는 3번 함수, 스트림 생성시 해당 스트림 구독
  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  // 스트림이 종료될 때마다, 해당 스트림에 대한 subscriber 객체를 삭제
  // checkSomeoneShareScreen 함수를 호출하여 스크린 공유 상태를 업데이트
  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      event.preventDefault();
    });
  }

  //  다른 유저의 상태가 변경되었을 때, 해당 상태 정보를 신호 메시지로 수신
  // 해당 유저 정보에 대하여, subscribers에서 검색하여 업데이트
  // state.subscribers를 업데이트하고, checkSomeoneShareScreen 함수를 호출하여 스크린 공유 상태를 업데이트
  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
    });
  }

  // 로컬 유저의 정보 변경 사항을 신호 메시지로 전달
  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    });
  }

  moveToBoard = (props) => {
    const webcam = document.getElementById("therapist_Webcam");
    this.stopWebcamFunction(webcam);
    this.setState({ sessionEnd: true });
    alert("치료를 종료합니다.");
  };

  stopWebcamFunction(webcam) {
    const stream = webcam.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    webcam.srcObject = null;
  }

  // html 랜더링
  render() {
    const localUser = this.state.localUser;
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user",
    };

    console.log(this.state.subscribers);

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="Docoach2">
        <div className="DoCoachingdiv2 row">
          <div className="DoCoachingdiv2_left col">
            <div className="DoCoachingdiv2_video">
              {this.state.subscribers.length > 0 && (
                <div className="video_paitent2">
                  <StreamComponent2
                    ref={(ref) => (this.childComponentRef = ref)}
                    ExerciseInfodata={this.state.ExerciseInfodata}
                    user={this.state.subscribers[0]}
                    streamId={
                      this.state.subscribers[0].streamManager.stream.streamId
                    }
                    setCapture={this.setState}
                    captureImage={this.state.captureImage}
                  />
                </div>
              )}
            </div>
            <div className="DoCoachingdiv2_video2">
              <div className="video_therapist2">
                <Webcam
                  width={200}
                  imageSmoothing={true}
                  audio={false}
                  mirrored={true}
                  videoConstraints={videoConstraints}
                  id="therapist_Webcam"
                />
              </div>
            </div>
            <div className="Auxiliary_tool row">
              <div className="Auxiliary_tool_left row">
                <div
                  className="Auxiliary_tool_Btn1"
                  onClick={this.toggleSwitchInGrandChild}
                  style={{cursor: 'pointer'}}
                >
                  모션 인식 ▶
                </div>
              </div>
              <div className="Auxiliary_tool_right">
                {/* <div className="Auxiliary_tool_Btn2">화면 캡처 ▶</div> */}
                <div style={{ width: "4%" }}></div>
                <div
                  className="Auxiliary_tool_Btn3"
                  style={{ cursor: "pointer" }}
                  onClick={this.moveToBoard}
                >
                  코칭 종료
                </div>
                {this.state.sessionEnd && (
                  <Navigate to="/Tboard" replace={true} />
                )}
              </div>
            </div>
          </div>
          <div className="DoCoachingdiv_right2 col">
            <PatientStatus ExerciseInfodata={this.state.ExerciseInfodata} />
            <div className="ExerciseInfo2">
              <img
                src={this.state.ExerciseInfodata.training.imageImgRoute}
                alt="img"
                className="exerciseing"
              />
            </div>

            <div className="changeExercise col">
              <select
                className="Exercise_mapping"
                onChange={this.changeSelectedExerciseList}
                style={{cursor: 'pointer'}}
                id="choose"
              >
                <option value="">환부 - 분류를 선택해주세요.</option>
                {this.state.ExerciseList.map((painpoint, index) => (
                  <option key={index} value={painpoint.mappingId}>
                    {painpoint.jointName}-{painpoint.trainingTypeName}
                  </option>
                ))}
              </select>

              <div className="Exercise_select row">
                <select className="Exercise_title" id="activeExercise" style={{cursor: 'pointer'}}>
                  <option value="">운동 이름을 선택해주세요.</option>
                  {this.state.SelectedExerciseList.map((painpoint, index) => (
                    <option key={index} value={painpoint.trainingId}>
                      {painpoint.trainingName}
                    </option>
                  ))}
                </select>
                <div className="Exercise_Btn" onClick={this.getExerciseData} style={{cursor: 'pointer'}}>
                  선택
                </div>
              </div>
            </div>
            <div className="Chatdiv2">
              {localUser !== undefined &&
                localUser.getStreamManager() !== undefined && (
                  <div className="OT_root OT_publisher custom-class">
                    <ChatComponent
                      user={localUser}
                      close={this.toggleChat}
                      messageReceived={this.checkNotification}
                      ExerciseInfodata={this.state.ExerciseInfodata}
                      sessionEnd={this.state.sessionEnd}
                      isChangeExercise={this.state.isChangeExercise}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */

  // session id를 createToken으로 전달
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }
  // 받은 session id 를 axios 요청
  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "/api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // The sessionId
  }
  // token 발행
  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "/api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // The token
  }
}
export default DoCoachingToTherapist;
