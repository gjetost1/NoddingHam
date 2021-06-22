import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";


function AlpacaStream() {
  const authAction = {"action": "auth", "key": "AKAH50HMXHBHFPJF6G4R", "secret": "KE0Uoia7scWUpFywwVHcWNYVXK80kxkzDC1W7dDE"}
  const [socketUrl, setSocketUrl] = useState("wss://stream.data.alpaca.markets/v2/iex");
  const messageHistory = useRef([]);
  const [inputValue, setInputValue] = useState(null);
  const { sendJsonMessage, lastJsonMessage, readyState, getWebSocket } = useWebSocket(socketUrl, {onOpen:()=>sendJsonMessage(authAction), share:true});

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastJsonMessage),
    [lastJsonMessage]
  );

  // const handleClickChangeSocketUrl = useCallback(
  //   () => setSocketUrl("wss://stream.data.alpaca.markets/v2/iex"),
  //   []
  // );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
 //useeffect

 useEffect(() => {
   console.log(connectionStatus)
   if (connectionStatus === "Open") {
    // sendJsonMessage(JSON.parse({"action":"subscribe","quotes":["AMD","CLDR"],"bars":["AAPL","VOO"]}))
    //  getWebSocket().send(JSON.stringify({"action":"subscribe","quotes":["AMD","CLDR"],"bars":["AAPL","VOO"]}))
   }
 } ,[connectionStatus])


  const handleClickSendMessage = useCallback(
    () => sendJsonMessage(JSON.parse(inputValue)),
    [inputValue]
  );

  //what to input as interpolated payload cmd
    //individual ticker
      //quote
      //bar
    //
    // {"action":"subscribe","quotes":["AMD","CLDR",${dbVAL}],"bars":["AAPL","VOO"]}

  // const handleAuth = useCallback(
  //   () => sendJsonMessage(JSON.parse(inputValue)),
  //   [inputValue]
  // );

  const authAPI = useCallback(
    () => sendJsonMessage(JSON.parse(authAction)),
    [authAction]
  );

  // if (ReadyState.OPEN) {
  //   console.log("this is open")
  //   //  (useCallback(
  //   //   () => sendJsonMessage(JSON.parse(authAction)),
  //   //   [authAction]
  //   // ))()
  // }


  return (
    <div>
      <div>
        <h1>msg to server</h1>
        {/* <button
          onClick={authAPI}
          disabled={readyState !== ReadyState.OPEN}
         >Authorize API</button> */}

      </div>
      {/* <button onClick={handleClickChangeSocketUrl}>CHANGE THE URL</button> */}

      <span>The WebSocket is currently {connectionStatus}</span>
      {/* {lastMessage ? <span>Last message: {lastMessage}</span> : null} */}
      {/* {console.log(`here is the messageHistory`, messageHistory)} */}
      {/* {console.log(lastMessage)} */}
      <ul>
        {/* {messageHistory.current.map(
          (message, idx) => {
            console.log(idx);
          }
          //   <span key={idx}>{message.data}</span>
          //   console.log(message)
        )} */}
        <li>{lastJsonMessage && JSON.stringify(lastJsonMessage)}</li>
      </ul>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        HANDLE CLICK SEND MSG
      </button>
      <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-red-500"
        ></input>
    </div>
  );
}

export default AlpacaStream;


// {"action": "auth", "key": "AKAH50HMXHBHFPJF6G4R", "secret": "KE0Uoia7scWUpFywwVHcWNYVXK80kxkzDC1W7dDE"}

// {"action":"subscribe","quotes":["AMD","CLDR"],"bars":["AAPL","VOO"]}
