import React, { Component } from "react";
import "./ChatComponent.css";

export default class ChatComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
      ExerciseInfodata: props.ExerciseInfodata,
      sessionEnd: props.sessionEnd,
      isChangeExercise: props.isChangeExercise,
    };
    this.chatScroll = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendExerciseChangeMessage = this.sendExerciseChangeMessage.bind(this);
    this.sendLeaveSession = this.sendLeaveSession.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        });

        setTimeout(() => {
          this.props.messageReceived();
        }, 50);
        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });

    this.props.user
      .getStreamManager()
      .stream.session.on("signal:exerciseChange", (event) => {
        //운동 변경 데이터 받아서 환자 쪽에서만 동작
        if (this.props.changeExercise !== undefined) {
          this.props.changeExercise(JSON.parse(event.data));
        }
      });

    this.props.user
      .getStreamManager()
      .stream.session.on("signal:leaveSession", () => {
        this.props.changeSessionEnd();
      });
  }

  componentDidUpdate(props) {
    if (this.props.user.getNickname() === "therapist") {
      //위에서 props 가 바뀌면 동작
      //생성자로 넣은 값은 안바뀜
      this.sendExerciseChangeMessage();
    }
    if (this.props.sessionEnd === true) {
      this.sendLeaveSession();
    }
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    } else if (event.key === "\\") {
      console.log("you click backslash");
    }
  }

  // 이거랑 비슷한 형태로 만들어야 할 것 같음, 버튼을 누르면 부모 컴포넌트에서 운동 디테일 받기, 받은 내용 반대편에 뿌리기, 반대편에서 받으면 부모 컴포넌트에 데이터 변경하기
  sendMessage() {
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
  }

  // 이거랑 비슷한 형태로 만들어야 할 것 같음, 버튼을 누르면 부모 컴포넌트에서 운동 디테일 받기, 받은 내용 반대편에 뿌리기, 반대편에서 받으면 부모 컴포넌트에 데이터 변경하기
  sendExerciseChangeMessage() {
    if (this.props.user) {
      //운동 변경용 데이터 만들고 넘김
      this.props.user.getStreamManager().stream.session.signal({
        data: JSON.stringify(this.state.ExerciseInfodata),
        type: "exerciseChange",
      });
    }
  }

  sendLeaveSession() {
    this.props.user.getStreamManager().stream.session.signal({
      type: "leaveSession",
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop =
          this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  close() {
    this.props.close(undefined);
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className={
                  "message" +
                  (data.connectionId !== this.props.user.getConnectionId()
                    ? " left"
                    : " right")
                }
              >
                <div className="msg-detail">
                  <div className="msg-content">
                    <span className="triangle" />
                    <p className="text">{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div id="messageInput">
            <input
              placeholder="Send a messge"
              id="chatInput"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
            />
            <div id="sendButton" onClick={this.sendMessage}>
              Comment
            </div>
          </div>
        </div>
      </div>
    );
  }
}
