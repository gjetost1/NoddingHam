import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualSecurity } from "../../store/stock";
import { useParams } from "react-router";
import Lines from "../Charts/Lines";
import PostWatchlist from "../Watchlist/postToWatchlist"
import PostPortfolio from '../Portfolio/postToPortfolio';
import { DailyDetails, HistoricalDetails } from "../Details"
// import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'


//backend query here



export default function IndividualStock() {
  const { ticker } = useParams()
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const userId = useSelector(state => state.session.user.id)

  useEffect(() => {
    (async function () {
      const newData = await dispatch(getIndividualSecurity(ticker))
      let dataObj = {}

      for (let [ticker, points] of Object.entries(newData)) {
        dataObj["id"] = ticker
        dataObj["color"] = "hsl(306, 68%, 57%)"
        dataObj["data"] = []
        points.forEach(point => dataObj["data"] = dataObj["data"].concat({ "x": point.date, "y": point.close }))
      }
      setData([dataObj])
      setIsLoaded(true)
    })();
  }, [])

  return isLoaded && (
    <div>
      <div>
        {data.map((security, i) => {
          return <div key={i}>
            <DailyDetails stats={"put websocket stats here"} />
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
