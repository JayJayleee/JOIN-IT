import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./therapistList.css";

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
  birth: string;
  gender: string;
  hospitalName: string;
  hospitalNumber: string;
  introduce: null;
  profileImgRoute: null;
  licenseImgRoute: null;
}

function AdTherapistList() {
  // const [dummyData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  const [therapistInfoList, setTherapistInfoList] = useState<ListInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchInfoData() {
      const { data } = await axios.get("/api/therapist");
      // console.log("비동기 작업 완료 후 데이터:", data); // 비동기 작업이 완료된 후 데이터 출력
      setTherapistInfoList(data.data);
    }
    fetchInfoData();
  }, []);

  // 현재 페이지의 첫 번째와 마지막 아이템의 인덱스 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = therapistInfoList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 현재 페이지를 변경하는 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (therapistInfoList.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={{ width: "65vw" }}>
        <h1 className="therapistLists_title">치료사 목록</h1>
        <div className="container" style={{ width: "100%" }}>
          <table id="rwd-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>No.</th>
                <th>치료사 이름</th>
                <th>치료사 아이디</th>
                <th>문자 수신 여부</th>
                <th>이메일 수신 여부</th>
                <th>가입 일자 </th>
                <th>전화번호</th>
                <th>병원명</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((a, e) => {
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
                    <td>{a.hospitalName}</td>
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
            length: Math.ceil(therapistInfoList.length / itemsPerPage),
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
              if (currentPage <= therapistInfoList.length / itemsPerPage) {
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

export default AdTherapistList;
