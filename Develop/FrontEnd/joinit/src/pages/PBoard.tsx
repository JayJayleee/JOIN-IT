import React, { useState } from "react";
import "./PBoard/PBoard.css";
import Nav from "../Components/Nav/Nav";
import Navbar from "./PBoard/navBar";
import CareCodeRegister from "./careCodeRegister";
import RightDashboard from "./PBoard/RightDashboard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import AfterCheck from "../Components/Check/afterCheck";
import { format } from "date-fns";
import Meeting from "../Components/PrescriptionType/Meeting";
import Exercise from "../Components/PrescriptionType/Exercise";
import ExerciseComplete from "../Components/PrescriptionType/ExerciseComplete";
import Coaching from "../Components/PrescriptionType/Coaching";
import CoachingComplete from "./../Components/PrescriptionType/CoachingComplete";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

type prescriptionListType = {
  prescriptionId: number;
  prescriptionCode: string;
  trainingName: string;
  jointTrainigTypeMappingDtoList: Object[];
  isCompleted: string;
};

type PreObject = {
  isCompleted: string;
  jointTrainingTypeMappingDtoList: Object[];
  prescriptionCode: string;
  prescriptionId: number;
  prescriptionProcessTime: string;
  trainingName: string;
};

ChartJS.register(ArcElement, Tooltip);

function PBoard() {
  const [GoToRegisterCareCode, setGoToRegisterCareCode] = useState(false);
  const [AfterTreatment, setAfterTreatment] = useState(false);
  const [afterTreatmentPrescriptionId, setAfterTreatmentPrescriptionId] =
    useState(0);
  const [selectTreatmentId, setTreatmentId] = useState(0);
  const [userToday, setUserToday] = useState({
    patientName: "",
    allCount: 0,
    completedCount: 0,
    prescriptionList: [] as prescriptionListType[],
  });
  const [existTodolist, setExistTodolist] = useState(true);
  const today = format(new Date(), "yyyy-MM-dd");

  const { state } = useLocation();
  // 도넛 그래프 데이터 설정
  const lst =
    userToday.completedCount === 0 && userToday.allCount === 0
      ? [10, 0]
      : [
          userToday.completedCount,
          userToday.allCount - userToday.completedCount,
        ];

  const data = {
    labels: ["완료 처방 갯수", "남은 처방 갯수"],
    datasets: [
      {
        label: "Amount",
        data: lst,
        backgroundColor: ["rgba(15, 89, 83, 1)", "rgba(133, 133, 133, 0.2)"],
        cutout: "85%",
      },
    ],
  };

  useEffect(() => {
    if (state) {
      // 코칭 종료 후 이동 시 사용
      if (state.afterCheck) {
        setAfterTreatment(true);
        setAfterTreatmentPrescriptionId(state.prescriptionId);
      }
      // profile에서 이동 시 사용
      if (state.selectTreatmentId) {
        setTreatmentId(state.selectTreatmentId);
      }
    }

    const headers = {
      "context-Type": "apllication/json",
      "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    };

    const fcData = async () => {
      try {
        const Result = await axios.get(
          `/api/treatment/isFirst/${localStorage.getItem("userPk")}`,
          { headers }
        );
        setExistTodolist(Result.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData = async () => {
      try {
        const Result = await axios.get("/api/prescription/daily/patient", {
          params: { patientId: localStorage.getItem("userPk"), date: today },
          headers: headers,
        });
        setUserToday(Result.data);
        setPosts(Result.data.prescriptionList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    fcData();
  }, [today]);

  const CareCodeStateHandler = () => {
    setGoToRegisterCareCode(false);
  };

  const TreatmentStateHandler = () => {
    setAfterTreatment(false);
  };

  const donut_chart = (
    <div className="col donut-chart-container">
      <Chart type="doughnut" data={data} />
      <div className="col doughnut-inner-text">
        <p>Completed</p>
        <p style={{ fontWeight: "bold", fontSize: "4rem" }}>
          {userToday.allCount !== 0
            ? ((userToday.completedCount / userToday.allCount) * 100).toFixed(1)
            : 100}
          %
        </p>
      </div>
    </div>
  );

  // 페이지네이션을 위한 변수 설정 및 함수 설정
  const [posts, setPosts] = useState<PreObject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = (posts: any) => {
    let currentPosts: PreObject[] = [];
    if (posts === undefined) {
      return [];
    } else {
      currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      return currentPosts;
    }
  };

  let postLength = 0;

  if (posts !== undefined) {
    postLength = posts.length;
  }

  let pageNumber = Math.ceil(postLength / postsPerPage);
  if (pageNumber === 0) {
    pageNumber = 1;
  }

  const pagination = (
    <ul className="row today-todo-pagination">
      <div
        className="today-todo-pageBoxBtn"
        onClick={
          currentPage === 1 ? undefined : () => setCurrentPage(currentPage - 1)
        }
        style={{ backgroundColor: currentPage === 1 ? "#5D6569" : "#dbf2f1" }}
      >
        <p className="page-link">{"<"}</p>
      </div>
      <div className="today-todo-pageBoxPageNum">
        <p>
          {currentPage} / {pageNumber}
        </p>
      </div>
      <div
        className="today-todo-pageBoxBtn"
        onClick={
          currentPage === pageNumber
            ? undefined
            : () => setCurrentPage(currentPage + 1)
        }
        style={{
          backgroundColor: currentPage === pageNumber ? "#5D6569" : "#dbf2f1",
        }}
      >
        <p className="page-link">{">"}</p>
      </div>
    </ul>
  );

  const today_prescription_list = (
    <div className="col patient-today-list-box">
      {currentPosts(posts).map((el) => {
        if (el.prescriptionCode === "대면") {
          return <Meeting data={el} key={el.prescriptionId} patient={"Y"} />;
        } else if (el.prescriptionCode === "코칭") {
          if (el.isCompleted === "N") {
            return <Coaching data={el} key={el.prescriptionId} patient={"Y"} />;
          } else {
            return (
              <CoachingComplete
                data={el}
                key={el.prescriptionId}
                patient={"Y"}
              />
            );
          }
        } else {
          if (el.isCompleted === "N") {
            return <Exercise data={el} key={el.prescriptionId} patient={"Y"} />;
          } else {
            return (
              <ExerciseComplete
                data={el}
                key={el.prescriptionId}
                patient={"Y"}
              />
            );
          }
        }
      })}
    </div>
  );

  const empty_prescription_list = (
    <div
      className="col patient-today-list-box"
      style={{ justifyContent: "center" }}
    >
      <p>오늘 할당된 처방 목록이 없어요.</p>
    </div>
  );

  const newPatient = (
    <div className="col newpatient-container">
      <p style={{ fontSize: "4rem", color: "#0F5953", fontWeight: "bolder" }}>
        처음이신가요?
      </p>
      <div
        className="col first-care-register"
        onClick={(e) => {
          setGoToRegisterCareCode(true);
        }}
      >
        <p>치료 번호 등록</p>
      </div>
      <p>병원 방문 후, SMS로 발송된 번호를 입력해주세요 :{")"}</p>
    </div>
  );

  // 스크롤 이동 이벤트를 위한 변수 및 함수
  const [position, setPosition] = useState(0);
  const [scrollMove, setScrollMove] = useState(false);

  function onScroll() {
    setPosition(window.scrollY || document.documentElement.scrollTop);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (position > 350 && scrollMove) {
      window.scrollTo({ top: 734, left: 0, behavior: "smooth" });
      setScrollMove(false);
    } else if (position < 300) {
      setScrollMove(true);
    }
  }, [position, scrollMove]);

  return (
    <React.Fragment>
      {AfterTreatment && (
        <AfterCheck
          selfCheck={TreatmentStateHandler}
          prescriptionId={afterTreatmentPrescriptionId}
        />
      )}

      <Nav setGoToRegisterCareCode={setGoToRegisterCareCode} />
      <div className="col patient-today-list">
        <div className="col patient-today-greeting">
          <p>오늘도 좋은 하루 보내세요,</p>
          <p>
            <span style={{ color: "#58867a" }}>{userToday.patientName}</span>{" "}
            님!
          </p>
        </div>
        <div className="col patient-today-todolist">
          <p className="patient-today-todolist-date">
            {today.replaceAll("-", ".")}
          </p>
          <div className="row patient-today-todolist-content">
            {existTodolist && newPatient}
            {!existTodolist && donut_chart}
            <div
              className="col today-todo-right-box"
              style={{ display: existTodolist ? "none" : "block" }}
            >
              {pagination}
              {userToday.prescriptionList.length !== 0
                ? today_prescription_list
                : empty_prescription_list}
            </div>
          </div>
        </div>
      </div>
      <div className="col Pboard">
        {GoToRegisterCareCode && (
          <CareCodeRegister CareCodeRegister={CareCodeStateHandler} />
        )}
        <div className="row Puppertitle">
          <p className="PwelcomeMsg">나의 치료 리스트</p>
          <div
            className="Pboardbutton-2"
            onClick={() => setGoToRegisterCareCode(true)}
          >
            <div className="Pboardeff-2"></div>
            <p> 치료 번호 등록 </p>
          </div>
        </div>
        <div className="row PdashboardDivide">
          <div className="PdashboardDivide_left">
            <Navbar
              setGoToRegisterCareCode={setGoToRegisterCareCode}
              setTreatmentId={setTreatmentId}
              selectTreatmentId={selectTreatmentId}
            />
          </div>
          <div className="col PdashboardDivide_right">
            <RightDashboard
              selectTreatmentId={selectTreatmentId}
              existTodolist={existTodolist}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PBoard;
