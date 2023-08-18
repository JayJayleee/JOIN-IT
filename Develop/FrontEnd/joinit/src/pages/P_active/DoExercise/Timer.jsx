import { useState, useEffect } from "react";
import './Timer.css'
function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, elapsedTime]);

  function startStopwatch() {
    setIsRunning(true);
  }

  function stopStopwatch() {
    setIsRunning(false);
  }

  function resetStopwatch() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatElapsedTime() {
    let totalSeconds = Math.floor(elapsedTime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    function formatTimeValue(timeValue) {
      return timeValue.toString().padStart(2, "0");
    }

    if (hours > 0) {
      return `${formatTimeValue(hours)}:${formatTimeValue(
        minutes
      )}:${formatTimeValue(seconds)}`;
    } else {
      return `${formatTimeValue(minutes)}:${formatTimeValue(seconds)}`;
    }
  }

  return (
    <div className="timer_container">
      <p className="elapsed-time-title">Timer</p>
      <p className="elapsed-time-text">{formatElapsedTime()}</p>
      <div className="buttons-container">
        {isRunning ? (
          <button className="timer_buttons" style={{cursor: 'pointer'}} type="button" onClick={stopStopwatch}>STOP</button>
        ) : (
          <button className="timer_buttons" style={{cursor: 'pointer'}} type="button" onClick={startStopwatch}>START</button>
        )}
        <button className="timer_buttons" style={{cursor: 'pointer'}} type="button" onClick={resetStopwatch}>RESET</button>
      </div>
    </div>
  );
}
export default Timer