import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIndividualSecurity,
  getWatchlist,
  addWatchList,
} from "../../store/stock";
import { useParams } from "react-router";
import Lines from "../Charts/Lines";
import DeleteFromWatchlist from "./deleteFromWatchlist";
import useMarketData from "../../websocket/useMarketData";

import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import { DailyDetails } from "../Details";
import { colors } from "../Portfolio/index";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Watchlist() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [deleted, setDeleted] = useState(false);

  const stats = useMarketData("watchlist");
  // console.log([stats])

  useEffect(() => {
    (async function () {
      const newData = await dispatch(getWatchlist(userId));
      let dataArray = [];

      for (let [ticker, points] of Object.entries(newData)) {
        let nextSecurity = {};
        nextSecurity["id"] = ticker;
        const color = Math.floor(Math.random() * 255);
        nextSecurity["color"] = `hsl(306, 68%, 57%)`;
        nextSecurity["data"] = [];
        points.forEach(
          (point) =>
            (nextSecurity["data"] = nextSecurity["data"].concat({
              x: point.date,
              y: point.close,
            }))
        );

        //multi chart
        dataArray = [...dataArray, [nextSecurity]];
        //single chart
        // dataArray = [...dataArray, nextSecurity]
      }
      setData(dataArray);
      setIsLoaded(true);
    })();
  }, [data, isLoaded]);

  const removeSecurity = (e) => {
    let security = e.target.parentNode.parentNode;
    security.setAttribute("hidden", true);
  };
  return (
    isLoaded && (
      <div
        className="max-w-7xl mx-auto sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.background_black }}
      >
        {
          <div>
            <DailyDetails title="Watchlist" stats={stats} />
            <div>
              {data.map((security, i) => {
                console.log(security, "sec");
                return (
                  <div className="watchlist-security" key={i}>
                    <div onClick={removeSecurity}>
                      <DeleteFromWatchlist
                        userId={userId}
                        ticker={security[0].id}
                      />
                    </div>
                    <div style={{ height: "500px", width: "1000px" }}>
                      <Lines data={[security[0]]} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
      </div>
    )
  );
}
