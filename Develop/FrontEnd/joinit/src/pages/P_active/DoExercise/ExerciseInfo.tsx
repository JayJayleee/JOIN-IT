import React from "react";
import { useEffect, useState } from "react";
import "./ExerciseInfo.css";

function TabContent2(props: any) {
  if (props.tab === 0) {
    return (
      <div className=" ExerciseInfo_div col">
        <div className="ExerciseInfo_title">운동 방법</div>
        <div className="ExerciseInfo_content row">
          <div
            className="ExerciseInfo_left"
            dangerouslySetInnerHTML={{
              __html: props.ExerciseInfodata.training.description,
            }}
          ></div>
          <div className="ExerciseInfo_right col">
            <p>세트 횟수</p>
            <p className="ExerciseInfo_content_angle">
              {props.ExerciseInfodata.prescription.setCount}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" ExerciseInfo_div col">
        <div className="ExerciseInfo_title">주의 사항</div>
        <div className="ExerciseInfo_content row">
          <div 
          className="ExerciseInfo_left"
          dangerouslySetInnerHTML={{
            __html: props.ExerciseInfodata.prescription.prescriptionComment,
          }}>
          </div>
          <div className="ExerciseInfo_right col">
            <p>목표 각도</p>
            <p className="ExerciseInfo_content_angle">
              {props.ExerciseInfodata.prescription.targetAngle}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function ExerciseInfo(props: any) {
  let [tab, changetab] = useState(0);

  return (
    <div className="ExerciseInfodiv col">
      <div className="ExerciseInfo_Navbar row">
        <div
          className="ExerciseInfo_Nav1"
          style={{cursor: 'pointer'}}
          onClick={() => {
            changetab(0);
          }}
        >
          ◀
        </div>
        <div
          className="ExerciseInfo_Nav2"
          style={{cursor: 'pointer'}}
          onClick={() => {
            changetab(1);
          }}
        >
          ▶
        </div>
      </div>
      <div>
        <TabContent2 tab={tab} ExerciseInfodata={props.ExerciseInfodata} />
      </div>
    </div>
  );
}

export default ExerciseInfo;
