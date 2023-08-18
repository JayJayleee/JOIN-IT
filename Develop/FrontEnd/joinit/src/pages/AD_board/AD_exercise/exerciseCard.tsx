import React from "react";
import "./exerciseCard.css";
import { Link } from "react-router-dom";

function exerciseCard(props: any) {
  // console.log(props);
  return (
    <div className="exerciseCardSection">
      <Link className="link" to={`/AdExerciseDetail/${props.props.trainingId}`}>
        <img className="preview" src={props.props.thumbnailImgRoute} alt="" />

        <div className="exerciseName">
          <div className="adlevelBox">LV.{props.props.difficulty}</div>
          <h1 className="adexercise-name-box">{props.props.trainingName}</h1>
        </div>
      </Link>
    </div>
  );
}

export default exerciseCard;
