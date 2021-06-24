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
        <div className='bg-gray-500'>
            <div className='m-7'>
                <h1 className='text-white pt-7 text-center'>Your Dashboard</h1>
            </div>
          <ul className="m-4">
            {Object.values(tickerInfo).map((ticker) => (
              <li className="relative flex space-x-3 my-5 mb-7">
                <div className="min-w-0 flex-1 pt-1.5 flex justify-start m-1 space-x-4">
                  <Link to={`/stock/${ticker.name}`}>
                    {/* this should be a link */}
                    <span><span className='text-white'>{ticker.name}</span></span>
                  </Link>
                  <div className="min-w-0 flex-1 pt-1.5 space-x-4 self-end">
                    <div>
                      <p className="text-sm text-right text-pink-500">
                        {ticker.close}
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
