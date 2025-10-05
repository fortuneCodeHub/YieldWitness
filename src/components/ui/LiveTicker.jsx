"use client";

import { useEffect, useState } from "react";

const symbols = [
  { label: "S&P 500", symbol: "^GSPC" },
  { label: "NASDAQ", symbol: "^IXIC" },
  { label: "BTC", symbol: "BTCUSDT" },  // or how your API identifies it
  { label: "ETH", symbol: "ETHUSDT" },
];

export default function LiveTicker() {
  const [data, setData] = useState([]);

  async function fetchTicker() {
    try {
      const responses = await Promise.all(symbols.map(async ({ symbol }) => {
        // Example using Finnhub REST endpoint
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
        );
        const json = await res.json();
        console.log(json);
        return { symbol, price: json.c, change: json.c - json.pc };  // c = current price, pc = previous close
        
      }));
      setData(responses);
    } catch (err) {
      console.error("Error fetching ticker data", err);
    }
  }

  useEffect(() => {
    fetchTicker();
    const interval = setInterval(fetchTicker, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex whitespace-nowrap">
      {data.map((item, idx) => {
        const changePct = ((item.change / (item.price - item.change)) * 100).toFixed(2);
        const sign = item.change >= 0 ? "+" : "";
        return (
          <span key={idx} className={`mr-6 ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}>
            {symbols.find(s => s.symbol === item.symbol)?.label} {sign}{changePct}%
          </span>
        );
      })}
    </div>
  );
}
