import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function AdExerciseUpdate() {
  const { trainingId } = useParams();
  const navigate = useNavigate();
  const [exerciseCategory, setExerciseCategory] = useState<string[]>([]);
  const [exerciseCategorynum, setExerciseCategorynum] = useState<number[]>([]);
  const [board, setBoard] = useState({
    trainingName: "",
    trainingURL: "",
    startPoint: "",
    middlePoint: "",
    endPoint: "",
    difficulty: "",
    description: "",
    rom: "",
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/training/${trainingId}`);
      setBoard(data);
      // 기존 데이터를 받아와서 form에 채워줍니다.
      // 여기서 data는 서버에서 가져온 기존 게시글 정보입니다.
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (trainingId) {
      // 게시글 수정 페이지로 들어왔을 때만 get 요청을 수행합니다.
      fetchData();
    }
  }, [trainingId]);

  const onChanges = (event: any) => {
    const { value, name } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const saveBoard = async () => {
    try {
      if (trainingId) {
        // trainingId가 있으면 기존 데이터 수정을 위해 put 요청을 보냅니다.
        await axios.put(`/api/training/${trainingId}`, board);
      } else {
        // trainingId가 없으면 새로운 데이터를 추가하기 위해 post 요청을 보냅니다.
        await axios.post("/api/training", board);
      }
      alert("저장되었습니다.");
      navigate("/AdBoard");
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const Delete = async () => {
    try {
      if (window.confirm("게시글을 삭제하시겠습니까?")) {
        await axios.delete(`/api/training/${trainingId}`);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
    alert("Delete Success");
    navigate("/AdBoard");
  };

  const {
    trainingName,
    trainingURL,
    startPoint,
    middlePoint,
    endPoint,
    difficulty,
    description,
    rom,
  } = board;
  // 선택한 운동 분류를 추가하는 함수
  const addExerciseCategory = (e: any) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    if (selectedOption.value) {
      setExerciseCategory((prevCategories) => [
        ...prevCategories,
        selectedOption.innerText,
      ]);

      // Convert the selected value to a number and add it to the array
      const selectedValueAsNumber = parseInt(selectedOption.value, 10);
      setExerciseCategorynum((prevNums) => [
        ...prevNums,
        selectedValueAsNumber,
      ]);
    }
  };

  // 운동 분류를 제거하는 함수
  const removeExerciseCategory = (index: number) => {
    setExerciseCategory((prevCategories) =>
      prevCategories.filter((_, i) => i !== index)
    );

    // exerciseCategorynum 배열에서도 해당 인덱스의 값을 제거
    setExerciseCategorynum((prevNums) =>
      prevNums.filter((_, i) => i !== index)
    );
  };

  // exerciseCategorynum 배열의 값 출력
  console.log(board);

  return (
    <div>
      <div className="leftarea">
        <h1>운동 생성 및 수정</h1>
        <div>
          <h3>운동 이름</h3>
          <input
            type="text"
            name="trainingName"
            value={trainingName}
            onChange={onChanges}
          />
        </div>
        <div>
          <h3>난이도</h3>
          <select
            name="difficulty"
            id="level"
            value={difficulty}
            onChange={onChanges}
          >
            <option value="">난이도 선택</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <h3>환부 - 운동 분류</h3>
          <select
            name="exerciseCategory"
            id="exerciseCategory"
            onChange={addExerciseCategory}
          >
            <option value="">운동 분류 선택</option>
            <option value="1">목 - 꺾기</option>
            <option value="2">목 - 돌리기</option>
            <option value="3">목 - 비틀기</option>
            <option value="4">목 - 앞뒤로 움직이기</option>
            <option value="5">목 - 유연하게 만들기</option>
          </select>
        </div>
        {exerciseCategory.map((category, index) => (
          <div key={index}>
            <p>
              {category}
              <button onClick={() => removeExerciseCategory(index)}>
                삭제
              </button>
            </p>
          </div>
        ))}
        <div>
          <h3>ROM</h3>
          <input name="rom" type="text" value={rom} onChange={onChanges} />
        </div>
        <div>
          <h3>운동 URL</h3>
          <input
            name="trainingURL"
            type="text"
            value={trainingURL}
            onChange={onChanges}
          />
        </div>
        <div>
          <h3>운동 설명</h3>
          <textarea
            name="description"
            value={description}
            onChange={onChanges}
          />
        </div>
      </div>
      <div className="rightarea">
        <h3>가이드라인 점 선택</h3>
        <img src="/Assets/images/guidelineex.png" alt="" />
        <div>
          <h3>시작점</h3>
          <select
            name="startPoint"
            id="start"
            value={startPoint}
            onChange={onChanges}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>
          <h3>중심점</h3>
          <select
            name="middlePoint"
            id="middle"
            value={middlePoint}
            onChange={onChanges}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>
          <h3>끝 점</h3>
          <select
            name="endPoint"
            id="end"
            value={endPoint}
            onChange={onChanges}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
        </div>
        <button onClick={saveBoard}> 수정하기 </button>
        <button onClick={Delete}> 삭제하기 </button>
      </div>
    </div>
  );
}

export default AdExerciseUpdate;
