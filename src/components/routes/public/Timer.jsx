import React, { useEffect, useState } from "react";

function Timer({ question, timesOut }) {
  const [seconds, setSeconds] = useState(10);

  const timeEnd = timesOut;

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
      timeEnd();
    }

    return () => clearInterval(interval);
  }, [seconds, timeEnd]);

  useEffect(() => {
    setSeconds(10);
  }, [question]);

  return (
    <div>
      <div id="some_div">{seconds}</div>
    </div>
  );
}

export default Timer;
