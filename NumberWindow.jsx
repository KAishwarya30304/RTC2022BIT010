import React, { useEffect, useState } from "react";

const API_ENDPOINTS = {
  even: "http://20.244.56.144/evaluation-service/even",
  fibo: "http://20.244.56.144/evaluation-service/fibo",
  primes: "http://20.244.56.144/evaluation-service/primes"
};

const WINDOW_SIZE = 10;

function NumberWindow() {
  const [windowPrev, setWindowPrev] = useState([]);
  const [windowCurr, setWindowCurr] = useState([]);
  const [fetchedNumbers, setFetchedNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

  const fetchNumbers = async (type) => {
    try {
      const response = await fetch(API_ENDPOINTS[type]);
      const data = await response.json();
      const numbers = data.numbers || [];

      const prev = [...windowCurr]; 
      const combined = [...windowCurr, ...numbers];
      const newWindow = combined.slice(-WINDOW_SIZE); 

      const newAvg = (newWindow.reduce((a, b) => a + b, 0) / newWindow.length).toFixed(2);

      setFetchedNumbers(numbers);
      setWindowPrev(prev);
      setWindowCurr(newWindow);
      setAvg(newAvg);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Sliding Window of Numbers</h2>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => fetchNumbers("even")}>Fetch Even</button>
        <button onClick={() => fetchNumbers("fibo")}>Fetch Fibonacci</button>
        <button onClick={() => fetchNumbers("primes")}>Fetch Primes</button>
      </div>

      <div><strong>Window Prev State:</strong> {JSON.stringify(windowPrev)}</div>
      <div><strong>Window Curr State:</strong> {JSON.stringify(windowCurr)}</div>
      <div><strong>Fetched Numbers:</strong> {JSON.stringify(fetchedNumbers)}</div>
      <div><strong>Average of Current Window:</strong> {avg}</div>
    </div>
  );
}

export default NumberWindow;