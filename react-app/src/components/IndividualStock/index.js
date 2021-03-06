import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualSecurity } from "../../store/stock";
import { useParams } from "react-router";
import Lines from "../Charts/Lines";
import PostWatchlist from "../Watchlist/postToWatchlist"
import PostPortfolio from '../Portfolio/postToPortfolio';
import HistoricalDetails from "../Details/HistoricalDetails";
import IndividualDailyDetails from "../Details/IndividualDailyDetails";
import useMarketData from "../../websocket/useMarketData";
import {colors} from "../Portfolio/index";
import Loader from "../Loader";

const remapData = (newData) => {
  let dataObj = {}

  for (let [ticker, points] of Object.entries(newData)) {
    dataObj["id"] = ticker
    dataObj["color"] = "hsl(183, 70%, 50%)"
    dataObj["data"] = []
    points.forEach(point => dataObj["data"] = dataObj["data"].concat({ "x": point.date, "y": point.close }))
  }

  return dataObj
}

export default function IndividualStock() {
  const { ticker } = useParams()
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const userId = useSelector(state => state.session.user.id)

  let test = useMarketData(["AAPL"]);
  console.log(test)

  useEffect(() => {
    (async function () {
      const newData = await dispatch(getIndividualSecurity(ticker))
      .catch(async (res) => {
        const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
        return  setErrors([`Oops! ${ticker} doesn't seem to be recognized as a stock ticker!`]);
      }
    });
      const remappedData = remapData(newData);
      setData([remappedData])
      setIsLoaded(true)
    })();
  }, [])

  if (!isLoaded) {
    return <Loader/>;
  }
  return isLoaded && (
    <div>
      <div style={{backgroundColor: colors.background_black}}>
        {data.map((security, i) => {
          return <div key={i}>
            <IndividualDailyDetails stats={"put websocket stats here"} />
            <PostWatchlist ticker={security.id} userId={userId} />
            <PostPortfolio ticker={security.id} userId={userId} />
            <div style={{ height: "500px", width: "1000px" }}>
              <Lines data={data} />
            </div>
            <HistoricalDetails ticker={security.id} />
          </div>
        })}
      </div>
    </div>
  )
}
