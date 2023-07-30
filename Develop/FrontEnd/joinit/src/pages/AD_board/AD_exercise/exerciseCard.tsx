import React from "react";
import "./exerciseCard.css";
import { Link } from "react-router-dom";

function exerciseCard(props: any) {
  console.log(props);
  return (
    <div className="exerciseCard">
      <div>
        <Link
          className="link"
          to={`/AdExerciseDetail/${props.props.trainingId}`}
        >
          <div>
            <img className="preview" src="/Assets/Images/exercise.png" alt="" />

            <div className="exerciseName">
              <div className="level">
                <p className="levelText">LV.{props.props.difficulty}</p>
              </div>
              <h2 className="nameText">{props.props.trainingName}</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default exerciseCard;
