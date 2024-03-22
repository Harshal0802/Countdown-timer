import { useState } from "react";
import "./CountDown.css";
import { useEffect } from "react";

const CountDown = () => {
  const [timer, setTimer] = useState("");
  const [isStartTimer, setIsStartTimer] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [time, setTime] = useState(0);

  const getTime = () => {
    const time = new Date(timer) - new Date();
    setTime(time);
    if (time > 0) {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMin(Math.floor((time / 1000 / 60) % 60));
      setSec(Math.floor((time / 1000) % 60));
    }
    if (time < 0) {
      setIsStartTimer(false);
    }
  };

  useEffect(() => {
    let interval;
    if (isStartTimer) {
      interval = setInterval(() => getTime(), 1000);
    }
    return () => clearInterval(interval);
  }, [isStartTimer]);

  return (
    <>
      <h1 className="header_text">
        Countdown <span className="sub_text">Timer</span>
      </h1>
      <input
        type="datetime-local"
        id="date_time"
        value={timer}
        onChange={(e) => setTimer(e.target.value)}
      />
      <div className="btn-container">
        <button
          onClick={() => {
            if (timer !== "") {
              if (isStartTimer) {
                setTimer("");
                setIsStartTimer(false);
                setDays(0);
                setHours(0);
                setMin(0);
                setSec(0);
              } else {
                setIsStartTimer(true);
                getTime();
              }
            }
          }}
        >
          {isStartTimer ? "Cancel Timer" : "Start Timer"}
        </button>
      </div>
      <div className="container">
        {days > 99 ? (
          <h3 className="message_text_100">
            Selected time is more that 100 days
          </h3>
        ) : time < 0 ? (
          <h3 className="message_text">{`The countdown is over! What's next on your adventure?`}</h3>
        ) : (
          <>
            <div className="timer_container">
              <h1>{days < 10 ? "0" + days : days}</h1>
              <span>Days</span>
            </div>
            <div className="timer_container">
              <h1>{hours < 10 ? "0" + hours : hours}</h1>
              <span>Hours</span>
            </div>
            <div className="timer_container">
              <h1>{min < 10 ? "0" + min : min}</h1>
              <span>Minutes</span>
            </div>
            <div className="timer_container">
              <h1>{sec < 10 ? "0" + sec : sec}</h1>
              <span>Seconds</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CountDown;
