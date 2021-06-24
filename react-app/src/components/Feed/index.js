import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  dashboard,
  getIndividualSecurity,
  getMarketClock,
  getPortfolio,
} from "../../store/stock";
import useMarketData from "../../websocket/useMarketData";


function Feed() {
    const dispatch = useDispatch();
    const [tickers, setTickers] = useState({});
    const [historicalData, setHistoricalData] = useState(null);
    const isMarketOpen = useSelector(
      (state) => state.stock.getMarketHours.is_open
    );
  
    // get search for data
    const portfolioData = useSelector((state) => state.stock.portfolio);
    // get user data
    const userId = useSelector((state) => state.session.user.id);
    
    const tickerInfo = useMarketData(["SBUX"]);

    return (
      tickerInfo && (
        <div className="flow-root  bg-gray-600">
          <ul className="-mb-8">
            {Object.values(tickerInfo).map((ticker) => (
              <div className="relative flex space-x-3">
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    {/* this should be a link */}
                    <span>Stock Name {ticker.name}</span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex space-x-4">
                    <div>
                      <p className="text-sm text-right text-gray-500">
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