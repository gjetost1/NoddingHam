// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { dashboard, getPortfolio } from "../../store/stock";
// import Lines from "../Charts/Lines";
// function Portfolio() {
//   const dispatch = useDispatch();
//   const [loaded, setLoaded] = useState(false);
//   const stocks = useSelector((state) => state.stock.dashboard);
//   const userId = useSelector((state) => state.session.id)
//   // use effect
//   // useEffect(() => {
//   //   async function getDashboard() {
//   //     const data = await dispatch(dashboard());
//   //     setLoaded(true);
//   //     return data;
//   //   }
//   //   getDashboard();
//   // }, [loaded]);

//   useEffect(() => {
//     (async function () {
//       const newData = await dispatch(getPortfolio(userId))
//       let dataObj = {}

//       for (let [ticker, points] of Object.entries(newData)) {
//         dataObj["id"] = ticker
//         dataObj["color"] = "hsl(183, 70%, 50%)"
//         dataObj["data"] = []
//         points.forEach(point => dataObj["data"] = dataObj["data"].concat({ "x": point.date, "y": point.close }))
//       }
//       setData([dataObj])
//       setIsLoaded(true)
//     })();
//   }, [])

//   console.log(`here comes the dashboard`, stocks);
//   if (loaded) {
//     return (
//       <div style={{ paddingRight: "25%", paddingLeft: "25%" }}>
//         <div style={{ height: "600px", width: "600px" }}>
//           {console.log([stocks])}
//           <Lines data={[stocks[0]]} />
//         </div>
//       </div>
//     );
//   }
//   if (!loaded) return <h1>Loading</h1>;
// }

// export default Portfolio;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolio, deleteFromPortfolio } from "../../store/stock";
import { useParams } from "react-router";
import Lines from "../Charts/Lines";
import useMarketData from "../../websocket/useMarketData";
import DeleteFromPortfolio from "./deleteFromPortfolio";
import PostPortfolio from "./postToPortfolio";

import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import { DailyDetails } from "../Details";

// websocket fetch here
// const stats = [
//   { name: 'Volume', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
//   { name: 'Open Price', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
//   { name: 'Close Price', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const colors = {
  background_black: "#0A0B0C",
  primary_white: "#ffffea",
  secondary_gray: "#1d2124",
  primary_pink: "#DC45CE",
  secondary_green: "#00c705",
  secondary_red: "#d35721",
};

export default function Portfolio() {
  //const { userId } = useParams();
  const userId = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [deleted, setDeleted] = useState(false);

  const stats = useMarketData("portfolio");
  // console.log([stats])

  useEffect(() => {
    (async function () {
      const newData = await dispatch(getPortfolio(userId));
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
  }, [isLoaded, data]);

  const removeSecurity = (e) => {
    let security = e.target.parentNode.parentNode;
    security.setAttribute("hidden", true);
  };
  return (
    isLoaded &&
    stats && (
      <div
        className="max-w-7xl mx-auto sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.background_black }}
      >
        <div>
          <DailyDetails title="Portfolio" stats={stats} />
          <div style={{ backgroundColor: colors.background_black }}>
            {data.map((security, i) => {
              return (
                <div className="watchlist-security" key={i}>
                  <div onClick={removeSecurity}>
                    <DeleteFromPortfolio
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
      </div>
    )
  );
}
