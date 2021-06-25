import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolio, getWatchlist } from "../store/stock";

//takes in tickers
function useMarketData(type = null, tickers = null) {
  const [tickerInfo, setTickerInfo] = useState({});
  const [marketData, setMarketData] = useState(null);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [historicalData, setHistoricalData] = useState(null);
  const isMarketOpen = useSelector(
    (state) => state.stock.getMarketHours.is_open
  );

  // get search for data
  const portfolioData = useSelector((state) => state.stock.portfolio);
  const watchlistData = useSelector((state) => state.stock.watchlist);

  // get user data
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    if (isLoaded) {
      type === "portfolio"
        ? setMarketData(portfolioData)
        : setMarketData(watchlistData);
    }
  });

  // handle ticker info
  if (tickers) {
    setMarketData(tickers.reduce((acc, curr) => ((acc[curr] = ""), acc), {}));
  }

  useEffect(() => {
    if (marketData) {
      if (!isMarketOpen) {
        let marketDataInfo = [];
        // Loop through market historical data
        for (const stock in marketData) {
          // We can add more historical data
          const name = stock;
          // Grab most current historical price
          const close = marketData[name][729].close;
          const volume = marketData[name][729].volume;
          const open = marketData[name][729].open;
          marketDataInfo.push({ name, close, volume, open });
        }
        setTickerInfo(marketDataInfo);
      }
    }
  }, [isLoaded, marketData]);

  useEffect(async () => {
    if (isLoaded === false) {
      if (type === "portfolio") dispatch(getPortfolio(userId));
      if (type === "watchlist") dispatch(getWatchlist(userId));
      setIsLoaded(true);
    }
  }, [isLoaded, dispatch]);

  const [socketUrl, setSocketUrl] = useState(
    "wss://stream.data.alpaca.markets/v2/iex"
  );

  const authAction = {
    action: "auth",
    key: process.env.REACT_APP_ALPACA_KEY,
    secret: process.env.REACT_APP_ALPACA_SECRET,
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
    if (connectionStatus === "Open" && marketData && isLoaded) {
      // console.log("This is", Object.keys(marketData))
      sendJsonMessage({
        action: "subscribe",
        quotes: Object.keys(marketData),
      });
    }
  }, [connectionStatus, isMarketOpen, marketData]);

  useEffect(() => {
    if (lastJsonMessage && isMarketOpen && marketData) {
      // console.log(lastJsonMessage);
      lastJsonMessage.forEach((msg) => {
        if (msg.S !== 0) {
          const currentTickerInfo = { ...tickerInfo };
          console.log(msg);
          currentTickerInfo[msg.S] = { close: msg.ap, name: msg.S };
          setTickerInfo(currentTickerInfo);
        }
      });
    }
  }, [lastJsonMessage, isMarketOpen]);

  console.log("These are tickers", tickerInfo);
  delete tickerInfo.undefined;
  return tickerInfo;
}

export default useMarketData;
