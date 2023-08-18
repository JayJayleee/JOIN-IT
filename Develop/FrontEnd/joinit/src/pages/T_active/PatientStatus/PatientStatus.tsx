import { useEffect, useState } from "react";
import "./PatientStatus.css";

function TabContent(props: any) {
  const dateStr = props.ExerciseInfodata.patientProfile.birth;
  const date = new Date(dateStr);
  const formattedDate = date.toISOString().slice(0, 10);

  if (props.tab === 0) {
    return (
      <div>
        <div className="Commentdiv col">
          <div className="commentdiv_detail row">
            <div className="commentdiv_title">환자명 / 성별</div>
            <div className="commentdiv_comment">
              {props.ExerciseInfodata.patientProfile.name} /{" "}
              {props.ExerciseInfodata.patientProfile.gender}
            </div>
          </div>
          <div className="commentdiv_detail row">
            <div className="commentdiv_title">키 / 몸무게</div>
            <div className="commentdiv_comment">
              {props.ExerciseInfodata.patientProfile.height} /{" "}
              {props.ExerciseInfodata.patientProfile.weight}
            </div>
          </div>
          <div className="commentdiv_detail row">
            <div className="commentdiv_title">생년월일</div>
            <div className="commentdiv_comment">{formattedDate}</div>
          </div>
          <div className="commentdiv_detail row">
            <div className="commentdiv_title">보유질환</div>
            <div className="commentdiv_comment">
              {props.ExerciseInfodata.patientProfile.diseaseCodeList}
            </div>
          </div>
          <div className="commentdiv_detail row">
            <div className="commentdiv_title">사고경력</div>
            <div className="commentdiv_comment">
              {props.ExerciseInfodata.patientProfile.pastAccidentDetails}
            </div>
          </div>
          <div className="commentdiv_detail row">
            <div className="commentdiv_title">비고</div>
            <div className="commentdiv_comment">
              {props.ExerciseInfodata.patientProfile.significant}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.tab === 1) {
    return (
      <div>
        <div className="Commentdiv col">
          <div className="commentdiv_detail row">
            <div className="commentdiv_title">치료시작일</div>
            <div className="commentdiv_comment">
              {props.ExerciseInfodata.treatment.startTime}
            </div>
          </div>
          <div className="commentdiv_detail row">
            <div className="commentdiv_title">사고경위</div>
            <div className="commentdiv_comment">
              {props.ExerciseInfodata.treatment.accidentDetail}
            </div>
          </div>
          <div className="commentdiv_detail row">
            <div className="commentdiv_title">특이사항</div>
            <div className="commentdiv_comment">
              {props.ExerciseInfodata.treatment.treatmentSignificant}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="Commentdiv col">
          <div className="commentdiv_title">최근 설문 내용</div>
          <div className="commentdiv_detail2 col">
            {props.ExerciseInfodata.survey ? (
              <div className="commentdiv_comment2">
                <p>
                  ·운동 이름 : {props.ExerciseInfodata.survey?.trainingName}
                </p>
                <p>
                  ·통증 정도 : {props.ExerciseInfodata.survey?.painDegree} / 10
                </p>
                <p>
                  ·통증 완화도 : {props.ExerciseInfodata.survey?.painRelief} /
                  10
                </p>
                <p>
                  ·운동 난이도 : {props.ExerciseInfodata.survey?.difficulty} /
                  10
                </p>
                <p>
                  ·운동 만족도 : {props.ExerciseInfodata.survey?.satisfaction} /
                  10
                </p>
                <p>·기타 : {props.ExerciseInfodata.survey?.etc}</p>
              </div>
            ) : (
              <div className="commentdiv_comment2">
                최근에 진행한 설문조사가 없어요.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function PatientStatus(props: any) {
  let [tab, changetab] = useState(0);

  return (
    <div>
      <div className="Navbar row">
        <div
          className="PatientStatus_Nav1"
          onClick={() => {
            changetab(0);
          }}
          style={{ backgroundColor: tab === 0 ? "#0f5953" : "#58867A",cursor: 'pointer' }}
        >
          환자 프로필
        </div>
        <div
          className="PatientStatus_Nav2"
          onClick={() => {
            changetab(1);
          }}
          style={{ backgroundColor: tab === 1 ? "#0f5953" : "#58867A",cursor: 'pointer' }}
        >
          초진 내용
        </div>
        <div
          className="PatientStatus_Nav3"
          onClick={() => {
            changetab(2);
          }}
          style={{ backgroundColor: tab === 2 ? "#0f5953" : "#58867A",cursor: 'pointer' }}
        >
          치료 기록
        </div>
      </div>
      <TabContent tab={tab} ExerciseInfodata={props.ExerciseInfodata} />
    </div>
  );
}

export default PatientStatus;
