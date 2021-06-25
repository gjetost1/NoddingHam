import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dashboard } from '../../store/stock';
import Lines from "../Charts/Lines";
import HistoricalDetails from "../Details/HistoricalDetails";
import { DailyDetails } from "../Details";
import useMarketData from "../../websocket/useMarketData";

const remapData = (newData) => {
    let dataArray = [];

    for (let [ticker, points] of Object.entries(newData)) {
        let dataObj = {};
        dataObj["id"] = ticker
        dataObj["color"] = "hsl(183, 70%, 50%)"
        dataObj["data"] = []
        points.forEach(point => dataObj["data"] = dataObj["data"].concat({ "x": point.date, "y": point.close }))

        dataArray.push(dataObj);
    }

    return dataArray
}

const Dashboard = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    // const stats = useMarketData();
    const stats = {}


    useEffect(() => {
        (async function () {
            const newData = await dispatch(dashboard());
            const remappedData = remapData(newData);
            setData(remappedData);
            setIsLoaded(true);
        })();
    }, []);

    return isLoaded && (
        <div>
            <DailyDetails stats={stats} />
            <div style={{ height: "500px", width: "1000px" }}>
                <Lines data={data} />
            </div>
        </div>
    );
}

export default Dashboard;
