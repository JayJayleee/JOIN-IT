import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdNav2 from "../AdNav2";
import "./exerciseUpdate.css";
import Editor from "../../../pages/T_care/Editor";

// 운동 분류 리스트 조회를 위한 인터페이스
interface painPointListType {
  mappingId: number;
  jointName: string;
  trainingTypeName: string;
}

//조회 시 들어오는 운동 분류 리스트 조회를 위한 인터페이스(키 값이 다름)
interface JointTrainingType {
  mappingId: number;
  jointName: string;
  trainingName: string;
}

// 기존 등록된 운동 정보 조회를 위한 인터페이스 설정
interface getExerciseDetail {
  description: string;
  difficulty: number;
  endPoint: number;
  middlePoint: number;
  rom: number;
  startPoint: number;
  trainingName: string;
  trainingURL: string;
  jointTrainingTypeMappingDtoList: JointTrainingType[];
  mappingIds: number[];
  imageImgRoute: string;
  filterImgRoute: string;
  thumbnailImgRoute: string;
}

// 수정하여 보내는 데이터
interface ExerciseDetail {
  description: string;
  difficulty: number;
  endPoint: number;
  middlePoint: number;
  rom: number;
  startPoint: number;
  trainingName: string;
  trainingURL: string;
  jointTrainingTypeMappingDtoList: JointTrainingType[];
  mappingIds: number[];
}

function AdExerciseUpdate() {
  const { trainingId } = useParams();

  const navnum = 0;
  const [nav] = useState(navnum);
  const navigate = useNavigate();

  const [painpointlist, setPainpointlist] = useState<painPointListType[]>([]);
  const [selectedPainpoint, setSelectedPainpoint] = useState<string[]>([]);
  const [selectedPainpointNum, setSelectedPainpointNum] = useState<number[]>(
    []
  );

  // 조회를 위한 exerciseDetail의 useState. api get 요청 후 저장함
  const [exerciseDetail, setExerciseDetail] = useState<getExerciseDetail>({
    description: "",
    difficulty: 0,
    endPoint: 0,
    middlePoint: 0,
    rom: 0,
    startPoint: 0,
    trainingName: "",
    trainingURL: "",
    jointTrainingTypeMappingDtoList: [],
    mappingIds: [],
    imageImgRoute: "",
    filterImgRoute: "",
    thumbnailImgRoute: "",
  });

  // 수정을 위해 작성 후 적용하는 useState. api put 요청으로 저장 예정
  const [editableExercise, setEditableExercise] = useState<ExerciseDetail>({
    description: "",
    difficulty: 0,
    endPoint: 0,
    middlePoint: 0,
    rom: 0,
    startPoint: 0,
    trainingName: "",
    trainingURL: "",
    jointTrainingTypeMappingDtoList: [],
    mappingIds: [],
  });

  //운동 분류를 가져오는 get 요청
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
  }, [trainingId]);

  // 기존 운동 데이터를 불러오는데, 조회 시 들어오는 운동 분류(부위, 종류, id) 와 put 요청 시 보내는 운동 데이터(id만)을 맞춤
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/training/${trainingId}`);
        setExerciseDetail({
          ...data,
          jointTrainingTypeMappingDtoList:
            data.jointTrainingTypeMappingDtoList || [],
          mappingIds: data.jointTrainingTypeMappingDtoList
            ? data.jointTrainingTypeMappingDtoList.map(
                (item: any) => item.mappingId
              )
            : [],
        });
        setEditableExercise({
          ...data,
          jointTrainingTypeMappingDtoList:
            data.jointTrainingTypeMappingDtoList || [],
          mappingIds: data.jointTrainingTypeMappingDtoList
            ? data.jointTrainingTypeMappingDtoList.map(
                (item: any) => item.mappingId
              )
            : [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (trainingId) {
      fetchData();
    }
  }, [trainingId]);

  // input, select, textarea에 작성된 내용을 editableexercise에 적용함
  const onInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setEditableExercise({
      ...editableExercise,
      [name]: value,
    });
  };

  // put 요청이 이뤄지는 저장 기능
  const saveEditExercise = async (e: any) => {
    e.preventDefault();
    if (
      !editableExercise.trainingName ||
      !editableExercise.trainingURL ||
      // !editableExercise.startPoint ||
      // !editableExercise.middlePoint ||
      // !editableExercise.endPoint ||
      !editableExercise.difficulty ||
      !editableExercise.description ||
      !editableExercise.rom ||
      !editableExercise.mappingIds
    ) {
      alert("모든 칸을 입력해주세요.");
    } else {
      const data = new FormData();
      const editedExerciseInfo = JSON.stringify(editableExercise);
      const editedExerciseblob = new Blob([editedExerciseInfo], {
        type: "application/json",
      });
      data.append("trainingInputDto", editedExerciseblob);

      // 이 부분을 추가하여 이미지가 업로드 되었을 때만 해당 파일을 FormData에 추가합니다.
      if (thumbnailPhoto) {
        data.append("thumbnailImgRoute", thumbnailPhoto);
      }

      if (exercisePhoto) {
        data.append("imageImgRoute", exercisePhoto);
      }

      if (filterPhoto) {
        data.append("filterImgRoute", filterPhoto);
      }

      try {
        await axios.put(`/api/training/${trainingId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });

        alert("성공적으로 수정되었습니다.");
        navigate("/AdBoard");
      } catch (error) {
        console.error("오류 발생:", error);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 게시글 삭제
  const Delete = async () => {
    try {
      if (window.confirm("게시글을 삭제하시겠습니까?")) {
        await axios.delete(`/api/training/${trainingId}`);
      } else {
        return false;
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
    alert("성공적으로 삭제되었습니다.");
    navigate("/AdBoard");
  };

  // const backToList = () => {
  //   navigate("/adboard");
  // };

  // 운동 분류 선택시 화면에 뿌리는 내용과 mappingIds에 따로 추가하기 위한 함수
  const addExerciseCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    if (selectedOption.value) {
      const selectedValueAsNumber = parseInt(selectedOption.value, 10);
      if (editableExercise.mappingIds.includes(selectedValueAsNumber)) {
        alert("이미 선택한 운동 분류입니다.");
        return false;
      } else {
        setSelectedPainpoint((prevCategories) => [
          ...prevCategories,
          selectedOption.innerText,
        ]);
        const selectedValueAsNumber = parseInt(selectedOption.value, 10);
        setSelectedPainpointNum((prevNums) => [
          ...prevNums,
          selectedValueAsNumber,
        ]);
        setEditableExercise((prevEditableExercise) => ({
          ...prevEditableExercise,
          mappingIds: [
            ...prevEditableExercise.mappingIds,
            selectedValueAsNumber,
          ],
        }));
        setExerciseDetail((prevExerciseDetail) => ({
          ...prevExerciseDetail,
          jointTrainingTypeMappingDtoList: [
            ...prevExerciseDetail.jointTrainingTypeMappingDtoList,
            {
              mappingId: selectedValueAsNumber,
              jointName: selectedOption.innerText.split("-")[0].trim(),
              trainingName: selectedOption.innerText.split("-")[1].trim(),
            },
          ],
        }));
      }
    }
  };

  // 운동 분류가 들어간 뒤, 삭제 버튼을 눌러 useState에서 삭제하는 기능

  const removeExerciseCategory = (index: number) => {
    setSelectedPainpoint((prevCategories) =>
      prevCategories.filter((_, i) => i !== index)
    );
    setSelectedPainpointNum((prevNums) =>
      prevNums.filter((_, i) => i !== index)
    );
    setEditableExercise((prevEditableExercise) => ({
      ...prevEditableExercise,
      mappingIds: prevEditableExercise.mappingIds.filter((_, i) => i !== index),
    }));
    setExerciseDetail((prevExerciseDetail) => ({
      ...prevExerciseDetail,
      jointTrainingTypeMappingDtoList:
        prevExerciseDetail.jointTrainingTypeMappingDtoList.filter(
          (_, i) => i !== index
        ),
    }));
  };
  // 시작점, 중심점, 끝점의 숫자 옵션에 넣을 값(1-20)
  const numbers = [];
  for (let i = 0; i <= 33; i++) {
    numbers.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const FILE_SIZE_MAX_LIMIT = 100 * 1024 * 1024;

  // 썸네일 이미지 업로드
  const [thumbnailPhoto, setthumbnailPhoto] = useState<File | null>();
  // 썸네일 이미지 업로드 시, 미리보기
  const [previewthumbnailImg, setpreviewthumbnailImg] = useState<string | null>(
    ""
  );

  // 파일 업로드 후,  썸네일 이미지를 useState에 올림
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

  //썸네일에 대한 미리보기를 수정함
  useEffect(() => {
    if (thumbnailPhoto) {
      const thubnailreader = new FileReader();
      thubnailreader.readAsDataURL(thumbnailPhoto);
      thubnailreader.onloadend = () => {
        setpreviewthumbnailImg(thubnailreader.result as string);
      };
    } else {
      setpreviewthumbnailImg(null);
    }
  }, [thumbnailPhoto]);

  // 운동 GIF 이미지
  const [exercisePhoto, setexercisePhoto] = useState<File | null>();
  const [previewexerciseImg, setpreviewexerciseImg] = useState<string | null>(
    ""
  );

  // 파일 업로드 후,  운동 이미지를 useState에 올림
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
  //운동 이미지에 대한 미리보기를 수정함
  useEffect(() => {
    if (exercisePhoto) {
      const exercisePhotoreader = new FileReader();
      exercisePhotoreader.readAsDataURL(exercisePhoto);
      exercisePhotoreader.onloadend = () => {
        setpreviewexerciseImg(exercisePhotoreader.result as string);
      };
    } else {
      setpreviewexerciseImg(null);
    }
  }, [exercisePhoto]);

  // 필터 이미지
  const [filterPhoto, setFilterPhoto] = useState<File | null>();
  const [previewFilterImg, setpreviewFilterImg] = useState<string | null>("");

  // 파일 업로드 후,  필터 이미지를 useState에 올림
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
  //필터 이미지에 대한 미리보기를 수정함
  useEffect(() => {
    if (filterPhoto) {
      const filterPhotoreader = new FileReader();
      filterPhotoreader.readAsDataURL(filterPhoto);
      filterPhotoreader.onloadend = () => {
        setpreviewFilterImg(filterPhotoreader.result as string);
      };
    } else {
      setpreviewFilterImg(null);
    }
  }, [filterPhoto]);
  //에디터 정보 받아오는 부분
  const [editorData, setEditorData] = useState("");
  const handleEditorChange = (inputdata: string) => {
    setEditorData(inputdata);
    setEditableExercise((prevExercise) => ({
      ...prevExercise,
      description: inputdata,
    }));
  };

  return (
    <div className="containboard">
      <div className="flexcontainer">
        <div className="navigation">
          <AdNav2 nav={nav} />
        </div>
        <div className="buttonseparate">
          <div className="titlediv">
            <h1 className="exercisetitle">운동 수정</h1>
          </div>
          <div className="flexcontainer">
            <div className="firstarea-update">
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
                      <img
                        src={exerciseDetail.thumbnailImgRoute}
                        alt="preview-Img"
                        style={{ width: "100%", height: "100%" }}
                      />
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
                      <img
                        src={exerciseDetail.imageImgRoute}
                        alt="preview-Img"
                        style={{ width: "100%", height: "100%" }}
                      />
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
                      <img
                        src={exerciseDetail.filterImgRoute}
                        alt="preview-Img"
                        style={{ width: "100%", height: "100%" }}
                      />
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
                  defaultValue={exerciseDetail.trainingName}
                  onChange={onInputChange}
                  className="inputs"
                />
              </div>
              <div>
                <h3>난이도</h3>
                <select
                  name="difficulty"
                  id="level"
                  value={editableExercise.difficulty}
                  onChange={onInputChange}
                  className="selects"
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

                <div className="flexmiddle">
                  <select
                    name="exerciseCategory"
                    id="exerciseCategory"
                    onChange={addExerciseCategory}
                    className="selects"
                    style={{ width: "120px" }}
                  >
                    <option value="">선택</option>
                    {painpointlist.map((painpoint, index) => (
                      <option key={index} value={painpoint.mappingId}>
                        {painpoint.jointName}-{painpoint.trainingTypeName}
                      </option>
                    ))}
                  </select>
                  <div className="categorybox">
                    {exerciseDetail.jointTrainingTypeMappingDtoList.map(
                      (item, index) => (
                        <div className="xboxcontainer" key={index}>
                          {item.jointName}-{item.trainingName}
                          <button
                            className="xbox"
                            onClick={() => removeExerciseCategory(index)}
                          >
                            X
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3>ROM</h3>
                <input
                  name="rom"
                  type="text"
                  value={editableExercise.rom}
                  onChange={onInputChange}
                  className="inputs"
                />
              </div>
              <div>
                <h3>운동 URL</h3>
                <input
                  name="trainingURL"
                  type="text"
                  defaultValue={exerciseDetail.trainingURL}
                  onChange={onInputChange}
                  className="inputs"
                />
              </div>
              <div className="createEditor">
                <h3>운동 설명</h3>
                <Editor
                  data={exerciseDetail.description}
                  onChange={handleEditorChange}
                />
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
                  value={editableExercise.startPoint}
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
                  value={editableExercise.middlePoint}
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
                  value={editableExercise.endPoint}
                  onChange={onInputChange}
                  className="selects"
                >
                  <option value="">선택하세요.</option>
                  {numbers}
                </select>
              </div>
              <div className="buttoncontainer">
                <div className="button-2" onClick={saveEditExercise}>
                  <div className="eff-2"></div>
                  <p>수정하기</p>
                </div>
                <div className="button-red" onClick={Delete}>
                  <div className="eff-red"></div>
                  <p>삭제하기</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdExerciseUpdate;
