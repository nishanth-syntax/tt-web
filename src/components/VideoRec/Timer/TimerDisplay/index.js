import React from 'react';
import { useTimer } from 'react-timer-hook';

function TimerDisplay({ expiryTimestamp }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{textAlign: 'center', display: 'none'}}>            
      <div style={{fontSize: '30px'}}>
        <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>      
    </div>
  );
}

export default TimerDisplay;