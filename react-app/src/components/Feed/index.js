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
import { Link } from 'react-router-dom'


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
    
    const tickerInfo = useMarketData();

    return (
      tickerInfo && (
        <div style={{ backgroundColor: 'grey'}}>
            <h1 className='text-white'>Your Dashboard</h1>
          <ul className="-mb-8 bg-gray-500">
            {Object.values(tickerInfo).map((ticker) => (
              <li className="relative flex space-x-3">
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <Link to={`/stock/${ticker.name}`}>
                    {/* this should be a link */}
                    <span>Ticker {ticker.name}</span>
                  </Link>
                  <div className="min-w-0 flex-1 pt-1.5 space-x-4 self-end">
                    <div>
                      <p className="text-sm text-right text-pink-500">
                        price {ticker.price}
                      </p> 
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    );
  }

  export default Feed;