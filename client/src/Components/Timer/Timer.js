import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = ({ showTimer }) => {
  const [seconds, setSeconds] = useState(10);

  var timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds === -1) {
      setSeconds(10);
    }

    return () => clearInterval(timer);
  });

  return (
    <div
      className="timer"
      style={{ right: `${showTimer ? "20px" : "-100px"}` }}
    >
      <h1>{seconds}</h1>
    </div>
  );
};

export default Timer;
