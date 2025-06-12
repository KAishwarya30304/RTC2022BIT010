import React, { useEffect, useState } from "react";

const STOCKS = {
  "Advanced Micro Devices, Inc.": "AMD",
  "Alphabet Inc. Class A": "GOOGL",
  "Alphabet Inc. Class C": "GOOG",
  "Amazon.com, Inc.": "AMZN",
  "Amgen Inc.": "AMGN",
  "Apple Inc.": "AAPL",
  "Berkshire Hathaway Inc.": "BRKB",
  "Booking Holdings Inc.": "BKNG",
  "Broadcom Inc.": "AVGO",
  "CSX Corporation": "CSX",
  "Eli Lilly and Company": "LLY",
  "Marriott International, Inc.": "MAR",
  "Marvell Technology, Inc.": "MRVL",
  "Meta Platforms, Inc.": "META",
  "Microsoft Corporation": "MSFT",
  "Nvidia Corporation": "NVDA",
  "PayPal Holdings, Inc.": "PYPL",
  "TSMC": "TSM", 
  "Tesla, Inc.": "TSLA",
  "Visa Inc.": "V"
};

function StackPrices() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      const results = {};
      for (const [company, symbol] of Object.entries(STOCKS)) {
        try {
          const response = await fetch(`https://api.marketdata.app/v1/stocks/quotes/${symbol}/`);
          const data = await response.json();
          results[company] = data.last ?? "N/A"; // last price
        } catch (error) {
          results[company] = "Error";
        }
      }
      setPrices(results);
    };

    fetchPrices();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📈 Real-time Stock Prices (Public API)</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead style={{ backgroundColor: "#444", color: "white" }}>
          <tr>
            <th>Company</th>
            <th>Symbol</th>
            <th>Last Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(STOCKS).map(([company, symbol]) => (
            <tr key={symbol}>
              <td>{company}</td>
              <td>{symbol}</td>
              <td>{prices[company] ?? "Loading..."}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StackPrices;
