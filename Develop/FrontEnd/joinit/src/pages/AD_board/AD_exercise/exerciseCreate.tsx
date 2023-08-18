import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdNav2 from "../AdNav2";
import "./exerciseUpdate.css";
import Editor from "../../../pages/T_care/Editor";

interface Exercise {
  trainingName: string;
  trainingURL: string;
  startPoint: number;
  middlePoint: number;
  endPoint: number;
  difficulty: number;
  description: string;
  rom: number;
  mappingIds: number[];
}

interface ExerciseImg {
  imageImgRoute: File;
  filterImgRoute: File;
  thumbnailImgRoute: File;
  trainingInputDto: {};
}

function ExerciseCreate() {
  // 관리자 네비게이션 바의 상태값 유지를 위한 내용
  const navnum = 0;
  const [nav] = useState(navnum);
  const navigate = useNavigate();

  //에디터 정보 받아오는 부분
  const [editorData, setEditorData] = useState("");
  const handleEditorChange = (inputdata: string) => {
    setEditorData(inputdata);
  };

  // 환부 - 운동 분류 리스트를 불러옴
  const [painpointlist, setPainpointlist] = useState<any[]>([]);

  // 관리자가 선택한 환부 - 운동 분류 리스트의 '이름'을 지정
  const [selectedPainpoint, setSelectedPainpoint] = useState<string[]>([]);

  // 관리자가 선택한 환부 - 운동 분류 리스트의 'ID'를 지정(axios로 전달할 값)
  const [selectedPainpointNum, setSelectedPainpointNum] = useState<number[]>(
    []
  );

  //axios 전달을 위한 데이터 key값을 먼저 지정해둠
  const [exercise, setExercise] = useState<Exercise>({
    trainingName: "",
    trainingURL: "",
    startPoint: 0,
    middlePoint: 0,
    endPoint: 0,
    difficulty: 0,
    description: editorData,
    rom: 0,
    mappingIds: selectedPainpointNum,
  });

  // 이후 exercise에 input에 작성한 내용을 다시 전달함
  const {
    trainingName,
    trainingURL,
    startPoint,
    middlePoint,
    endPoint,
    difficulty,
    description,
    rom,
    mappingIds,
  } = exercise;

  // 환부 - 운동 분류를 가져오는 axios 요청
  useEffect(() => {
    const fetchExerciseListData = async () => {
      try {
        const { data } = await axios.get("/api/training/jointMapping");
        setPainpointlist(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchExerciseListData();
  }, []);

  //input 데이터 axios 요청을 위해 모아서 저장하는 함수
  const onInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    // Convert specific fields to numbers if they are numeric values
    const intValue = [
      "startPoint",
      "endPoint",
      "rom",
      "middlePoint",
      "difficulty",
    ];
    const parsedValue = intValue.includes(name)
      ? parseInt(value, 10) || 0
      : value;

    setExercise({
      ...exercise,
      [name]: parsedValue,
      description: editorData,
    });
  };

  const saveExercise = async (e: any) => {
    e.preventDefault();
    if (
      !trainingName ||
      !trainingURL ||
      !difficulty ||
      !description ||
      !rom ||
      !mappingIds
    ) {
      alert("모든 칸을 입력해주세요.");
    } else {
      const data = new FormData();
      const exerciseInfo = JSON.stringify(exercise);
      const exerciseblob = new Blob([exerciseInfo], {
        type: "application/json",
      });
      data.append("trainingInputDto", exerciseblob);
      data.append("imageImgRoute", exercisePhoto as File);
      data.append("thumbnailImgRoute", thumbnailPhoto as File);
      data.append("filterImgRoute", filterPhoto as File);
      // console.log("데이터", data);
      // console.log("exercisePhoto", exercisePhoto);
      try {
        await axios.post("/api/training", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        console.log("요청성공");
        alert("저장되었습니다.");
        navigate("/adboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 뒤로가기 버튼
  const backToList = () => {
    navigate("/adboard");
  };

  // 선택한 운동 분류를 추가하는 함수
  const addExerciseCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    if (selectedOption.value) {
      if (selectedPainpoint.includes(selectedOption.innerText)) {
        alert("이미 선택한 운동 분류입니다.");
        return false;
      } else {
        setSelectedPainpoint((prevCategories) => [
          ...prevCategories,
          selectedOption.innerText,
        ]);

        // 여기서는 axios를 위해(리스트 내 숫자 값으로 전달해야 함) 변경하여 따로 저장함
        const selectedValueAsNumber = parseInt(selectedOption.value, 10);

        setSelectedPainpointNum((prevNums) => [
          ...prevNums,
          selectedValueAsNumber,
        ]);
        setExercise((prevExercise) => ({
          ...prevExercise,
          mappingIds: [...prevExercise.mappingIds, selectedValueAsNumber], // 변경된 부분
        }));
      }
    }
  };
  console.log("분류명", selectedPainpoint);
  console.log("분류아이디", selectedPainpointNum);
  console.log("제출값", exercise.mappingIds);

  // 선택한 운동 분류를 눌러서 삭제하는 함수
  const removeExerciseCategory = (index: number) => {
    setSelectedPainpoint((prevCategories) =>
      prevCategories.filter((_, i) => i !== index)
    );

    // 숫자로 변환한 분류 배열에서도 해당 인덱스의 값을 제거
    setSelectedPainpointNum((prevNums) =>
      prevNums.filter((_, i) => i !== index)
    );
  };

  // 시작점, 중심점, 끝점
  const numbers = [];
  for (let i = 0; i <= 33; i++) {
    numbers.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  console.log(exercise);
  const FILE_SIZE_MAX_LIMIT = 100 * 1024 * 1024;

  // 썸네일 이미지
  const [thumbnailPhoto, setthumbnailPhoto] = useState<File | null>(null);
  const [previewthumbnailImg, setpreviewthumbnailImg] = useState<string | null>(
    null
  );

  const savethumbnailPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      if (event.target.files[0].size > FILE_SIZE_MAX_LIMIT) {
        event.target.value = "";
        alert("업로드 가능한 최대 용량은 100MB입니다. ");
        return;
      } else {
        const thumbnailfile = event.target.files[0];
        console.log(thumbnailfile);
        if (thumbnailfile) {
          setthumbnailPhoto(thumbnailfile);
        } else {
          setthumbnailPhoto(null);
        }
      }
    }
  };

  useEffect(() => {
    if (thumbnailPhoto) {
      const reader0 = new FileReader();
      reader0.readAsDataURL(thumbnailPhoto);
      reader0.onloadend = () => {
        setpreviewthumbnailImg(reader0.result as string);
      };
    } else {
      setpreviewthumbnailImg(null);
    }
  }, [thumbnailPhoto]);

  // 운동 GIF 이미지
  const [exercisePhoto, setexercisePhoto] = useState<File | null>(null);
  const [previewexerciseImg, setpreviewexerciseImg] = useState<string | null>(
    null
  );

  const saveExercisePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      if (event.target.files[0].size > FILE_SIZE_MAX_LIMIT) {
        event.target.value = "";
        alert("업로드 가능한 최대 용량은 100MB입니다. ");
        return;
      } else {
        const ExercisePhotofile = event.target.files[0];
        console.log(ExercisePhotofile);
        if (ExercisePhotofile) {
          setexercisePhoto(ExercisePhotofile);
        } else {
          setexercisePhoto(null);
        }
      }
    }
  };

  useEffect(() => {
    if (exercisePhoto) {
      const reader1 = new FileReader();
      reader1.readAsDataURL(exercisePhoto);
      reader1.onloadend = () => {
        setpreviewexerciseImg(reader1.result as string);
      };
    } else {
      setpreviewexerciseImg(null);
    }
  }, [exercisePhoto]);

  // 필터 이미지
  const [filterPhoto, setFilterPhoto] = useState<File | null>(null);
  const [previewFilterImg, setpreviewFilterImg] = useState<string | null>(null);

  const saveFilterPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      if (event.target.files[0].size > FILE_SIZE_MAX_LIMIT) {
        event.target.value = "";
        alert("업로드 가능한 최대 용량은 100MB입니다. ");
        return;
      } else {
        const filterphotofile = event.target.files[0];
        console.log(filterphotofile);
        if (filterphotofile) {
          setFilterPhoto(filterphotofile);
        } else {
          setFilterPhoto(null);
        }
      }
    }
  };

  useEffect(() => {
    if (filterPhoto) {
      const reader2 = new FileReader();
      reader2.readAsDataURL(filterPhoto);
      reader2.onloadend = () => {
        setpreviewFilterImg(reader2.result as string);
      };
    } else {
      setpreviewFilterImg(null);
    }
  }, [filterPhoto]);

  return (
    <div className="containboard">
      <div className="flexcontainer">
        <div className="navigation">
          <AdNav2 nav={nav} />
        </div>
        <div className="buttonseparate">
          <div className="titlediv">
            <h1 className="exercisetitle">운동 등록</h1>
          </div>
          <div className="flexcontainer">
            <div className="firstarea-create">
              {/* 운동 미리 보기 등록 */}
              <div className="col admin-register-divide-license">
                <div className="col admin-signupPage-license">
                  <div className="admin-register-preview" onClick={() => {}}>
                    {previewthumbnailImg && (
                      <img
                        src={previewthumbnailImg as string}
                        alt="preview-Img"
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                    {!previewthumbnailImg && (
                      <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                        No Image
                      </p>
                    )}
                  </div>
                  <p>미리 보기 사진 등록*</p>
                  <label
                    className="therapist-signupPage-license-input"
                    htmlFor="thumbnailPhoto"
                  >
                    <div className="admin-create-button">
                      <div className="admin-create-eff" />
                      <p>등록</p>
                    </div>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="license-inputbtn"
                    id="thumbnailPhoto"
                    onChange={savethumbnailPhoto}
                  />
                </div>
              </div>

              {/* 운동 GIF 등록 */}
              <div className="col admin-register-divide-license">
                <div className="col admin-signupPage-license">
                  <div className="admin-register-preview" onClick={() => {}}>
                    {previewexerciseImg && (
                      <img
                        src={previewexerciseImg as string}
                        alt="preview-Img"
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                    {!previewexerciseImg && (
                      <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                        No Image
                      </p>
                    )}
                  </div>
                  <p>운동 GIF 등록*</p>
                  <label
                    className="therapist-signupPage-license-input"
                    htmlFor="exercisePhoto"
                  >
                    <div className="admin-create-button">
                      <div className="admin-create-eff" />
                      <p>등록</p>
                    </div>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="license-inputbtn"
                    id="exercisePhoto"
                    onChange={saveExercisePhoto}
                  />
                </div>
              </div>

              {/* 필터 이미지 등록 */}
              <div className="col admin-register-divide-license">
                <div className="col admin-signupPage-license">
                  <div className="admin-register-preview" onClick={() => {}}>
                    {previewFilterImg && (
                      <img
                        src={previewFilterImg as string}
                        alt="preview-Img"
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                    {!previewFilterImg && (
                      <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                        No Image
                      </p>
                    )}
                  </div>
                  <p>필터 이미지 등록*</p>
                  <label
                    className="therapist-signupPage-license-input"
                    htmlFor="filterPhoto"
                  >
                    <div className="admin-create-button">
                      <div className="admin-create-eff" />
                      <p>등록</p>
                    </div>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="license-inputbtn"
                    id="filterPhoto"
                    onChange={saveFilterPhoto}
                  />
                </div>
              </div>
            </div>

            <div className="leftarea">
              <div>
                <h3>운동 이름</h3>
                <input
                  type="text"
                  name="trainingName"
                  value={trainingName}
                  onChange={onInputChange}
                  className="inputs"
                />
              </div>
              <div>
                <h3>난이도</h3>
                <select
                  name="difficulty"
                  id="level"
                  value={difficulty}
                  onChange={onInputChange}
                  className="selects"
                >
                  <option value="">난이도 선택</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <div>
                <h3>환부 - 운동 분류</h3>
                <div className="flexmiddle">
                  <select
                    name="exerciseCategory"
                    id="exerciseCategory"
                    onChange={addExerciseCategory}
                    className="selectsinflexmiddle"
                  >
                    <option value="">선택</option>
                    {painpointlist.map((painpoint, index) => (
                      <option key={index} value={painpoint.mappingId}>
                        {painpoint.jointName}-{painpoint.trainingTypeName}
                      </option>
                    ))}
                  </select>
                  <div className="categorybox">
                    {selectedPainpoint.map((category, index) => (
                      <div className="xboxcontainer" key={index}>
                        {category}
                        <button
                          className="xbox"
                          onClick={() => removeExerciseCategory(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3>ROM</h3>
                <input
                  name="rom"
                  type="number"
                  placeholder="1-360도 각도를 입력해주세요."
                  min={1}
                  value={rom}
                  onChange={onInputChange}
                  className="inputs"
                />
              </div>
              <div>
                <h3>운동 URL</h3>
                <input
                  name="trainingURL"
                  type="text"
                  value={trainingURL}
                  onChange={onInputChange}
                  className="inputs"
                />
              </div>
              <div className="createEditor">
                <h3>운동 설명</h3>
                <Editor data={editorData} onChange={handleEditorChange} />
              </div>
            </div>
            <div className="rightarea">
              <div className="fleximage">
                <img
                  src="https://i.imgur.com/m9MWgRD.png"
                  style={{ width: "30%" }}
                  alt=""
                />
              </div>
              <div>
                <h3>시작점</h3>
                <select
                  name="startPoint"
                  id="start"
                  value={startPoint}
                  onChange={onInputChange}
                  className="selects"
                >
                  <option value="">선택하세요.</option>
                  {numbers}
                </select>
              </div>
              <div>
                <h3>중심점</h3>
                <select
                  name="middlePoint"
                  id="middle"
                  value={middlePoint}
                  onChange={onInputChange}
                  className="selects"
                >
                  <option value="">선택하세요.</option>
                  {numbers}
                </select>
              </div>
              <div>
                <h3>끝 점</h3>
                <select
                  name="endPoint"
                  id="end"
                  value={endPoint}
                  onChange={onInputChange}
                  className="selects"
                >
                  <option value="">선택하세요.</option>
                  {numbers}
                </select>
              </div>
              <div className="buttoncontainer">
                <div className="button-2" onClick={saveExercise}>
                  <div className="eff-2"></div>
                  <p>등록하기</p>
                </div>
                <div className="button-red" onClick={backToList}>
                  <div className="eff-red"></div>
                  <p>뒤로가기</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCreate;
