import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [target, setTarget] = useState(10); // default 10 seconds
  const intervalRef = useRef(null);

  const audioRef = useRef(new Audio("https://www.soundjay.com/button/beep-07.wav")); // free sound

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === target) {
      audioRef.current.play(); // or console.log("Target reached!");
      setIsRunning(false);
    }
  }, [seconds, target]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Stopwatch: {seconds}s</h1>

      <input
        type="number"
        placeholder="Target time (sec)"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        disabled={isRunning}
        style={{ marginBottom: '10px' }}
      />
      <br />

      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
