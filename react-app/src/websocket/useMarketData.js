import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolio } from '../store/stock';

//takes in tickers
function useMarketData(tickers) {
  const [tickerInfo, setTickerInfo] = useState({});
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [historicalData, setHistoricalData] = useState(null);
  const isMarketOpen = useSelector(
    (state) => state.stock.getMarketHours.is_open
  );

  // get search for data
  const portfolioData = useSelector((state) => state.stock.portfolio);
  // get user data
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
      if (portfolioData !== undefined) {
          if (!isMarketOpen) {
              let portfolioInfo = []
              // Loop through market historical data
              for (const stock in portfolioData) {
                  // We can add more historical data
                  const name = stock;
                  // Grab most current historical price
                  const price = portfolioData[name][729].close
                  portfolioInfo.push({name, price})
              }
              setTickerInfo(portfolioInfo);
          } 
      }
  }, [isLoaded, portfolioData])
  
  useEffect(async () => {
    if (isLoaded === false) {
        dispatch(getPortfolio(userId));
        setIsLoaded(true);
    }
  }, [isLoaded, dispatch]);

  const [socketUrl, setSocketUrl] = useState(
    "wss://stream.data.alpaca.markets/v2/iex"
  );
  
  const authAction = {
    action: "auth",
    key: "AKAH50HMXHBHFPJF6G4R",
    secret: "KE0Uoia7scWUpFywwVHcWNYVXK80kxkzDC1W7dDE",
  };
  
  const { sendJsonMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket(socketUrl, {
      onOpen: () => sendJsonMessage(authAction),
      share: true,
    });


  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  
  useEffect(() => {
    // console.log(connectionStatus);
    if (connectionStatus === "Open" && (portfolioData !== undefined && isLoaded)) {
      sendJsonMessage({
        action: "subscribe",
        quotes: Object.keys(portfolioData),
      });
    }
  }, [connectionStatus, isMarketOpen, portfolioData]);

  useEffect(() => {
    if (lastJsonMessage && (isMarketOpen && portfolioData !== undefined)) {
      // console.log(lastJsonMessage);
      lastJsonMessage.forEach((msg) => {
        const currentTickerInfo = { ...tickerInfo };
        console.log(msg)
        currentTickerInfo[msg.S] = { price: msg.ap, name: msg.S };
        setTickerInfo(currentTickerInfo);
      });
    }
  }, [lastJsonMessage, isMarketOpen]);
  console.log("These are tickers", tickerInfo)
  delete tickerInfo.undefined
  return tickerInfo;
}

export default useMarketData;
