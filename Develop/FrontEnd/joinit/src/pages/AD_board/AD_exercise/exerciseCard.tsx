import React from "react";
import "./exerciseCard.css";
import { Link } from "react-router-dom";

function exerciseCard(props: any) {
  console.log(props);
  return (
    <div className="exerciseCard">
      <Link to={`/AdExerciseDetail/${props.props.trainingId}`}>
        <div>
          <img src="/Assets/Images/exercise.png" alt="" />
          <p>LV.{props.props.difficulty}</p>
          <p>{props.props.trainingName}</p>
        </div>
      </Link>
    </div>
  );
}

export default exerciseCard;
