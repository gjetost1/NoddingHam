import React from 'react';

import { useDispatch } from 'react-redux';

const Websocket = require('ws');
const ReconnectingWebSocket = require('reconnecting-websocket');
// set up the Alpaca stream endpoint
const ALPACA_STREAM_URL = "wss://data.alpaca.markets/stream";
// get the access_token from your OAuth Login function
const { access_token } = loginAlpaca();

const alpacaOpenStream = () => {
  const options = {
    WebSocket,
    maxRetries: 100,
  };

  const ws = new ReconnectingWebSocket(ALPACA_STREAM_URL, [], options);
  return ws;
};

const alpacaSubscribeAuth = async (ws, access_token) => {
  ws.send(
    JSON.stringify({
      action: 'authenticate',
      data: {
        oauth_token: access_token,
      },
     })
    );
  };

  const alpacaSubscribeToTrades = (ws) => {
    ws.send(
      JSON.stringify({
        action: 'listen',
        data: {
        streams: ['trade_updates'],
        },
      })
    );
  };

  const createSocket = (access_token) => {
    // websocket setup
    const ws = alpacaOpenStream();

    ws.addEventListener('open', async function open() {
      // authenticate, then subscribe to trade_updates
      await alpacaSubscribeAuth(ws, access_token);
      alpacaSubscribeToTrades(ws);

      console.log('Opened ⚡️tream ⚡️ocket');
    });

    ws.addEventListener('message', function incoming(msg) {
      console.log('Message: 📬 ', JSON.parse(msg.data));
         if (msg.stream === 'trade_updates' && msg.data.event === 'new') {
           console.log('New Trade 💹: ', msg.data);
         }
    });
    return ws;
  };
  // finally call the function!
  createSocket(access_token);

const AlpacaStream = () => {
  return (
   <h1>we here</h1>
  );
}
// wscat -c wss://data.alpaca.markets/stream
// {"action": "authenticate","data": {"key_id": "AKAH50HMXHBHFPJF6G4R", "secret_key": "KE0Uoia7scWUpFywwVHcWNYVXK80kxkzDC1W7dDE"}}
// {"action": "listen", "data": {"streams": ["T.AAPL"]}}
export default AlpacaStream;
