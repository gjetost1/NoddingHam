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
  let portfolioData = useSelector((state) => state.stock.portfolio);
  // get user data
  const userId = useSelector((state) => state.session.user.id);

  if (tickers) {
    portfolioData = tickers.reduce((acc,curr) => (acc[curr]='',acc),{});
    console.log("Portfolio Data", portfolioData)
  }

  useEffect(() => {
      if (portfolioData !== undefined) {
          if (!isMarketOpen) {
              let portfolioInfo = []
              // Loop through market historical data
              for (const stock in portfolioData) {
                  // We can add more historical data
                  const name = stock;
                  // Grab most current historical price
                  const close = portfolioData[name][729].close
                  const volume = portfolioData[name][729].volume
                  const open = portfolioData[name][729].open
                  portfolioInfo.push({name, close, volume, open})
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
      console.log("This is", Object.keys(portfolioData))
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
        if (msg.S !== 0) {
        const currentTickerInfo = { ...tickerInfo };
        console.log(msg)
        currentTickerInfo[msg.S] = { close: msg.ap, name: msg.S };
        setTickerInfo(currentTickerInfo);
        }
      });
    }
  }, [lastJsonMessage, isMarketOpen]);

  console.log("These are tickers", tickerInfo)
  delete tickerInfo.undefined
  return tickerInfo;
}

export default useMarketData;
