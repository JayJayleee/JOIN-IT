import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../AD_therapist/therapistList.css";

interface ListInfo {
  userId: string;
  name: string;
  loginId: string;
  password: null;
  phone: string;
  email: string;
  userTypeCode: string;
  socialTypeCode: string;
  refreshToken: null;
  smsAgree: string;
  emailAgree: string;
  createTime: string;
  updateTime: string;
  endTime: null;
  height: number;
  weight: number;
  birth: string;
  gender: string;
  nickname: string;
  etc: string;
  pastAccidentDetails: string;
  significant: string;
  profileColorCode: string;
  patientDiseaseList: [];
}

function AdPatientList() {
  const [patientInfoList, setPatientInfoList] = useState<ListInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchInfoData() {
      const { data } = await axios.get("/api/patient");
      // console.log("비동기 작업 완료 후 데이터:", data); // 비동기 작업이 완료된 후 데이터 출력
      setPatientInfoList(data.data);
    }
    fetchInfoData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = patientInfoList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지네이션 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (currentItems.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={{ width: "65vw" }}>
        <h1 className="therapistLists_title">환자 목록</h1>
        <div className="container" style={{ width: "100%" }}>
          <table id="rwd-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>No.</th>
                <th>환자 이름</th>
                <th>환자 아이디</th>
                <th>문자 수신 여부</th>
                <th>이메일 수신 여부</th>
                <th>가입 일자 </th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              {patientInfoList.map((a, e) => {
                const day = a.createTime?.substr(0, 10);
                const phone =
                  a.phone?.substr(0, 3) +
                  "-" +
                  a.phone?.substr(3, 4) +
                  "-" +
                  a.phone?.substr(7, 4);
                return (
                  <tr key={e}>
                    <td>{e + 1}</td>
                    <td>{a.name}</td>
                    <td>{a.loginId}</td>
                    <td>{a.smsAgree}</td>
                    <td>{a.emailAgree}</td>
                    <td>{day}</td>
                    <td>{phone}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="paginationflex">
          <button
            onClick={() => {
              if (currentPage >= 2) {
                paginate(currentPage - 1);
              }
            }}
            className="paginationBtn"
          >
            Prev
          </button>

          {Array.from({
            length: Math.ceil(patientInfoList.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className="paginationBtn"
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => {
              if (currentPage <= patientInfoList.length / itemsPerPage) {
                paginate(currentPage - 1);
              }
            }}
            className="paginationBtn"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default AdPatientList;
