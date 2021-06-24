import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

//takes in tickers
function useMarketData(tickers) {
  //const userQuotes = ["AMD", "CLDR", "GLD", "AAPL", "MSFT"];
  //   const childRefs = useMemo(() => userQuotes.map(() =>))

  const [socketUrl, setSocketUrl] = useState(
    "wss://stream.data.alpaca.markets/v2/iex"
  );
  const [tickerInfo, setTickerInfo] = useState({});
  const { sendJsonMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket(socketUrl, {
      onOpen: () => sendJsonMessage(authAction),
      share: true,
    });

  const authAction = {
    action: "auth",
    key: "AKAH50HMXHBHFPJF6G4R",
    secret: "KE0Uoia7scWUpFywwVHcWNYVXK80kxkzDC1W7dDE",
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    // console.log(connectionStatus);
    if (connectionStatus === "Open") {
      sendJsonMessage({
        action: "subscribe",
        quotes: tickers,
      });
    }
  }, [connectionStatus]);

  useEffect(() => {
    if (lastJsonMessage) {
      // console.log(lastJsonMessage);
      lastJsonMessage.forEach((msg) => {
        const currentTickerInfo = { ...tickerInfo };
        currentTickerInfo[msg.S] = { price: msg.ap, name: msg.S };
        setTickerInfo(currentTickerInfo);
      });
    }
  }, [lastJsonMessage]);
  // console.log(`here are the tickers`, tickerInfo);
  return tickerInfo;
}

export default useMarketData;
