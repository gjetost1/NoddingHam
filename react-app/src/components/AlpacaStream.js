import React from 'react';

import Alpaca from '@alpacahq/alpaca-trade-api'
const alpaca = new Alpaca({
  keyId: 'AKAH50HMXHBHFPJF6G4R',
  secretKey: 'KE0Uoia7scWUpFywwVHcWNYVXK80kxkzDC1W7dDE',
  paper: true,
  usePolygon: false
})

const AlpacaStream = () => {
  return (
   <h1>here we are</h1>
  );
}
// wscat -c wss://data.alpaca.markets/stream
// {"action": "authenticate","data": {"key_id": "AKAH50HMXHBHFPJF6G4R", "secret_key": "KE0Uoia7scWUpFywwVHcWNYVXK80kxkzDC1W7dDE"}}
// {"action": "listen", "data": {"streams": ["T.AAPL"]}}
export default AlpacaStream;
