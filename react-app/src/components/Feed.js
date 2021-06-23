import React, { useState, useRef, useEffect, useMemo } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useMarketData from "../websocket/useMarketData";
const timeline = [
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",

    iconBackground: "bg-gray-400",
  },
  {
    id: 2,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",

    iconBackground: "bg-blue-500",
  },
  {
    id: 3,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    href: "#",
    date: "Sep 28",
    datetime: "2020-09-28",

    iconBackground: "bg-green-500",
  },
  {
    id: 4,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 30",
    datetime: "2020-09-30",
    iconBackground: "bg-blue-500",
  },
  {
    id: 5,
    content: "Completed interview with",
    target: "Katherine Snyder",
    href: "#",
    date: "Oct 4",
    datetime: "2020-10-04",
    iconBackground: "bg-green-500",
  },
];

function Feed() {
  const tickerInfo = useMarketData(["AMD", "CLDR", "GLD", "AAPL", "MSFT"]);

  console.log(tickerInfo);
  return (
    tickerInfo && (
      //   <h1>{JSON.stringify(lastJsonMessage)}</h1>
      <div className="flow-root bg-gray-600">
        <ul className="-mb-8">
          {Object.values(tickerInfo).map((ticker) => (
            <div className="relative pb-8">
              <div className="relative flex space-x-3">
                <div>
                  {/* this should be a link */}
                  <span>Stock Name {ticker.name}</span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      price {ticker.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    )
  );
}

export default Feed;
