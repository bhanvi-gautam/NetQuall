import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    // <div style={{textAlign: 'center'}}> 
      <div style={{fontSize: '20px'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    // </div>
  );
}

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 59); // 1 minute timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}