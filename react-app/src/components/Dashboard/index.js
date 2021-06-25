import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { dashboard } from "../../store/stock";
import Lines from "../Charts/Lines";
import HistoricalDetails from "../Details/HistoricalDetails";
import { DailyDetails } from "../Details";
import useMarketData from "../../websocket/useMarketData";
import { colors } from "../Portfolio/index";

const remapData = (newData) => {
  let dataArray = [];

  for (let [ticker, points] of Object.entries(newData)) {
    let dataObj = {};
    dataObj["id"] = ticker;
    dataObj["color"] = "hsl(183, 70%, 50%)";
    dataObj["data"] = [];
    points.forEach(
      (point) =>
        (dataObj["data"] = dataObj["data"].concat({
          x: point.date,
          y: point.close,
        }))
    );

    dataArray.push(dataObj);
  }

  return dataArray;
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [dashboardLoaded, setIsDashboardLoaded] = useState(false);
  const dashboardData = useSelector((state) => state.stock.dashboard);

  // const stats = useMarketData();
  const stats = useMarketData("portfolio", null);

  //get dashboard data
  useEffect(async () => {
    if (!dashboard) {
      await dispatch(dashboard());
      setIsDashboardLoaded(true);
    }
  }, [dispatch, dashboardLoaded, dashboard, stats]);

  // fixing the memory leak
  useEffect(() => {
    if (dashboardLoaded) {
      (async function () {
        const remappedData = remapData(dashboardData);
        setData(remappedData);
        setIsLoaded(true);
        // handle the cleanup function
        return function () {
          setData({});
        };
      })();
    }
  }, [data, isLoaded, dashboard, stats]);

  return (
    isLoaded && (
      <div style={{ backgroundColor: colors.background_black }}>
        {/* <DailyDetails stats={stats} /> */}
        <div style={{ height: "500px", width: "1000px" }}>
          <Lines data={data} />
        </div>
      </div>
    )
  );
};

export default Dashboard;
